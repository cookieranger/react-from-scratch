function createEleemnt(type, config, children) {
  let props = Object.assign({}, config)


  // Build props.children. We'll make it an array if more than 1
  let childCount = arguments.length - 2;
  if (childCount === 1) {
    props.children = children
  } else if (childCount > 1) {
    props.children = [].slice.call(arguments, 2)
  }

  return { type, props }
}

// Bookkeeping bits. We need to store some data and ensure that no roots conflict.
const ROOT_KEY = 'asdfsadf'
const instancesByRootID = {};
let rootId = 1;

function isRoot(node) {
  if (node.dataSet(ROOT_KEY)) {
    return true
  }
  return false
}

function render(element, node) {
  assert(Element.isValidElement(element));


  // First check if we've already rendered into this node.
  // If so, this is an update
  // Otherwise this is an initial render
  if (isRoot(node)) {
    update(element, node)
  }
  else {
    mount(element, node)
  }
}

function mount(element, node) {
  // Create the inernal instance. This abstracts away the different components type
  let component = instantiateComponent(element)

  // Store this for later updates & unmounting.
  instancesByRootID[rootID] = component;

  //mounting generates DOM nodes. This is where React determines if
  // we're remounting server rendered contnet
  let renderedNode = Reconciler.mountComponent(component, node)

  // do some rdom operations, marking this node as a root, and inserting the new DOM as a child, node.dataset[ROOT_KEY] = rootID;
  DOM.empty(node)
  DOM.appendChild(node, renderedNode);
  rootID++;
}

function update(element, node) {
  // Find the internal instance and update it
  let id = node.dataset[ROOT_KEY]
  let instance = instancesByRootID[id]

  let prevElem = instance._currentElement;
  if (shouldUpdateComponent(prevElem, element)) {
    // Send the new element to the instance.
    Reconciler.receiveComponent( // actually receiving element
      instance,
      element
    )
  }
  else {
    // Unmount and then mount the new one
    unmountComponentAtNode(node)
    mount(element, node)
  }
}

const shouldUpdateComponent // here, 11:20