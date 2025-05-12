import {
  Typeahead
} from "./chunk-MUKCUSBU.js";
import {
  NG_VALUE_ACCESSOR
} from "./chunk-OF3A6BBJ.js";
import {
  FocusTrap,
  InteractivityChecker,
  _VisuallyHiddenLoader
} from "./chunk-OB3F32C4.js";
import {
  FocusMonitor,
  Platform,
  _CdkPrivateStyleLoader
} from "./chunk-UXB2OZPM.js";
import {
  DOCUMENT,
  NgStyle,
  isPlatformBrowser
} from "./chunk-HVXUJW2O.js";
import {
  APP_ID,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Injectable,
  InjectionToken,
  Injector,
  NgModule,
  NgZone,
  PLATFORM_ID,
  QueryList,
  Renderer2,
  Subject,
  Subscription,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  isObservable,
  model,
  of,
  output,
  setClassMetadata,
  signal,
  take,
  viewChild,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵlistener,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryAdvance,
  ɵɵviewQuerySignal
} from "./chunk-35KBKYLW.js";
import "./chunk-WDMUDEB6.js";

// node_modules/@angular/cdk/fesm2022/coercion/private.mjs
function coerceObservable(data) {
  if (!isObservable(data)) {
    return of(data);
  }
  return data;
}

// node_modules/@angular/cdk/fesm2022/tree-key-manager-KnCoIkIC.mjs
var TreeKeyManager = class {
  /** The index of the currently active (focused) item. */
  _activeItemIndex = -1;
  /** The currently active (focused) item. */
  _activeItem = null;
  /** Whether or not we activate the item when it's focused. */
  _shouldActivationFollowFocus = false;
  /**
   * The orientation that the tree is laid out in. In `rtl` mode, the behavior of Left and
   * Right arrow are switched.
   */
  _horizontalOrientation = "ltr";
  /**
   * Predicate function that can be used to check whether an item should be skipped
   * by the key manager.
   *
   * The default value for this doesn't skip any elements in order to keep tree items focusable
   * when disabled. This aligns with ARIA guidelines:
   * https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols.
   */
  _skipPredicateFn = (_item) => false;
  /** Function to determine equivalent items. */
  _trackByFn = (item) => item;
  /** Synchronous cache of the items to manage. */
  _items = [];
  _typeahead;
  _typeaheadSubscription = Subscription.EMPTY;
  _hasInitialFocused = false;
  _initializeFocus() {
    if (this._hasInitialFocused || this._items.length === 0) {
      return;
    }
    let activeIndex = 0;
    for (let i = 0; i < this._items.length; i++) {
      if (!this._skipPredicateFn(this._items[i]) && !this._isItemDisabled(this._items[i])) {
        activeIndex = i;
        break;
      }
    }
    const activeItem = this._items[activeIndex];
    if (activeItem.makeFocusable) {
      this._activeItem?.unfocus();
      this._activeItemIndex = activeIndex;
      this._activeItem = activeItem;
      this._typeahead?.setCurrentSelectedItemIndex(activeIndex);
      activeItem.makeFocusable();
    } else {
      this.focusItem(activeIndex);
    }
    this._hasInitialFocused = true;
  }
  /**
   *
   * @param items List of TreeKeyManager options. Can be synchronous or asynchronous.
   * @param config Optional configuration options. By default, use 'ltr' horizontal orientation. By
   * default, do not skip any nodes. By default, key manager only calls `focus` method when items
   * are focused and does not call `activate`. If `typeaheadDefaultInterval` is `true`, use a
   * default interval of 200ms.
   */
  constructor(items, config) {
    if (items instanceof QueryList) {
      this._items = items.toArray();
      items.changes.subscribe((newItems) => {
        this._items = newItems.toArray();
        this._typeahead?.setItems(this._items);
        this._updateActiveItemIndex(this._items);
        this._initializeFocus();
      });
    } else if (isObservable(items)) {
      items.subscribe((newItems) => {
        this._items = newItems;
        this._typeahead?.setItems(newItems);
        this._updateActiveItemIndex(newItems);
        this._initializeFocus();
      });
    } else {
      this._items = items;
      this._initializeFocus();
    }
    if (typeof config.shouldActivationFollowFocus === "boolean") {
      this._shouldActivationFollowFocus = config.shouldActivationFollowFocus;
    }
    if (config.horizontalOrientation) {
      this._horizontalOrientation = config.horizontalOrientation;
    }
    if (config.skipPredicate) {
      this._skipPredicateFn = config.skipPredicate;
    }
    if (config.trackBy) {
      this._trackByFn = config.trackBy;
    }
    if (typeof config.typeAheadDebounceInterval !== "undefined") {
      this._setTypeAhead(config.typeAheadDebounceInterval);
    }
  }
  /** Stream that emits any time the focused item changes. */
  change = new Subject();
  /** Cleans up the key manager. */
  destroy() {
    this._typeaheadSubscription.unsubscribe();
    this._typeahead?.destroy();
    this.change.complete();
  }
  /**
   * Handles a keyboard event on the tree.
   * @param event Keyboard event that represents the user interaction with the tree.
   */
  onKeydown(event) {
    const key = event.key;
    switch (key) {
      case "Tab":
        return;
      case "ArrowDown":
        this._focusNextItem();
        break;
      case "ArrowUp":
        this._focusPreviousItem();
        break;
      case "ArrowRight":
        this._horizontalOrientation === "rtl" ? this._collapseCurrentItem() : this._expandCurrentItem();
        break;
      case "ArrowLeft":
        this._horizontalOrientation === "rtl" ? this._expandCurrentItem() : this._collapseCurrentItem();
        break;
      case "Home":
        this._focusFirstItem();
        break;
      case "End":
        this._focusLastItem();
        break;
      case "Enter":
      case " ":
        this._activateCurrentItem();
        break;
      default:
        if (event.key === "*") {
          this._expandAllItemsAtCurrentItemLevel();
          break;
        }
        this._typeahead?.handleKey(event);
        return;
    }
    this._typeahead?.reset();
    event.preventDefault();
  }
  /** Index of the currently active item. */
  getActiveItemIndex() {
    return this._activeItemIndex;
  }
  /** The currently active item. */
  getActiveItem() {
    return this._activeItem;
  }
  /** Focus the first available item. */
  _focusFirstItem() {
    this.focusItem(this._findNextAvailableItemIndex(-1));
  }
  /** Focus the last available item. */
  _focusLastItem() {
    this.focusItem(this._findPreviousAvailableItemIndex(this._items.length));
  }
  /** Focus the next available item. */
  _focusNextItem() {
    this.focusItem(this._findNextAvailableItemIndex(this._activeItemIndex));
  }
  /** Focus the previous available item. */
  _focusPreviousItem() {
    this.focusItem(this._findPreviousAvailableItemIndex(this._activeItemIndex));
  }
  focusItem(itemOrIndex, options = {}) {
    options.emitChangeEvent ??= true;
    let index = typeof itemOrIndex === "number" ? itemOrIndex : this._items.findIndex((item) => this._trackByFn(item) === this._trackByFn(itemOrIndex));
    if (index < 0 || index >= this._items.length) {
      return;
    }
    const activeItem = this._items[index];
    if (this._activeItem !== null && this._trackByFn(activeItem) === this._trackByFn(this._activeItem)) {
      return;
    }
    const previousActiveItem = this._activeItem;
    this._activeItem = activeItem ?? null;
    this._activeItemIndex = index;
    this._typeahead?.setCurrentSelectedItemIndex(index);
    this._activeItem?.focus();
    previousActiveItem?.unfocus();
    if (options.emitChangeEvent) {
      this.change.next(this._activeItem);
    }
    if (this._shouldActivationFollowFocus) {
      this._activateCurrentItem();
    }
  }
  _updateActiveItemIndex(newItems) {
    const activeItem = this._activeItem;
    if (!activeItem) {
      return;
    }
    const newIndex = newItems.findIndex((item) => this._trackByFn(item) === this._trackByFn(activeItem));
    if (newIndex > -1 && newIndex !== this._activeItemIndex) {
      this._activeItemIndex = newIndex;
      this._typeahead?.setCurrentSelectedItemIndex(newIndex);
    }
  }
  _setTypeAhead(debounceInterval) {
    this._typeahead = new Typeahead(this._items, {
      debounceInterval: typeof debounceInterval === "number" ? debounceInterval : void 0,
      skipPredicate: (item) => this._skipPredicateFn(item)
    });
    this._typeaheadSubscription = this._typeahead.selectedItem.subscribe((item) => {
      this.focusItem(item);
    });
  }
  _findNextAvailableItemIndex(startingIndex) {
    for (let i = startingIndex + 1; i < this._items.length; i++) {
      if (!this._skipPredicateFn(this._items[i])) {
        return i;
      }
    }
    return startingIndex;
  }
  _findPreviousAvailableItemIndex(startingIndex) {
    for (let i = startingIndex - 1; i >= 0; i--) {
      if (!this._skipPredicateFn(this._items[i])) {
        return i;
      }
    }
    return startingIndex;
  }
  /**
   * If the item is already expanded, we collapse the item. Otherwise, we will focus the parent.
   */
  _collapseCurrentItem() {
    if (!this._activeItem) {
      return;
    }
    if (this._isCurrentItemExpanded()) {
      this._activeItem.collapse();
    } else {
      const parent = this._activeItem.getParent();
      if (!parent || this._skipPredicateFn(parent)) {
        return;
      }
      this.focusItem(parent);
    }
  }
  /**
   * If the item is already collapsed, we expand the item. Otherwise, we will focus the first child.
   */
  _expandCurrentItem() {
    if (!this._activeItem) {
      return;
    }
    if (!this._isCurrentItemExpanded()) {
      this._activeItem.expand();
    } else {
      coerceObservable(this._activeItem.getChildren()).pipe(take(1)).subscribe((children) => {
        const firstChild = children.find((child) => !this._skipPredicateFn(child));
        if (!firstChild) {
          return;
        }
        this.focusItem(firstChild);
      });
    }
  }
  _isCurrentItemExpanded() {
    if (!this._activeItem) {
      return false;
    }
    return typeof this._activeItem.isExpanded === "boolean" ? this._activeItem.isExpanded : this._activeItem.isExpanded();
  }
  _isItemDisabled(item) {
    return typeof item.isDisabled === "boolean" ? item.isDisabled : item.isDisabled?.();
  }
  /** For all items that are the same level as the current item, we expand those items. */
  _expandAllItemsAtCurrentItemLevel() {
    if (!this._activeItem) {
      return;
    }
    const parent = this._activeItem.getParent();
    let itemsToExpand;
    if (!parent) {
      itemsToExpand = of(this._items.filter((item) => item.getParent() === null));
    } else {
      itemsToExpand = coerceObservable(parent.getChildren());
    }
    itemsToExpand.pipe(take(1)).subscribe((items) => {
      for (const item of items) {
        item.expand();
      }
    });
  }
  _activateCurrentItem() {
    this._activeItem?.activate();
  }
};
function TREE_KEY_MANAGER_FACTORY() {
  return (items, options) => new TreeKeyManager(items, options);
}
var TREE_KEY_MANAGER = new InjectionToken("tree-key-manager", {
  providedIn: "root",
  factory: TREE_KEY_MANAGER_FACTORY
});

// node_modules/@angular/cdk/fesm2022/a11y.mjs
var ID_DELIMITER = " ";
function addAriaReferencedId(el, attr, id) {
  const ids = getAriaReferenceIds(el, attr);
  id = id.trim();
  if (ids.some((existingId) => existingId.trim() === id)) {
    return;
  }
  ids.push(id);
  el.setAttribute(attr, ids.join(ID_DELIMITER));
}
function removeAriaReferencedId(el, attr, id) {
  const ids = getAriaReferenceIds(el, attr);
  id = id.trim();
  const filteredIds = ids.filter((val) => val !== id);
  if (filteredIds.length) {
    el.setAttribute(attr, filteredIds.join(ID_DELIMITER));
  } else {
    el.removeAttribute(attr);
  }
}
function getAriaReferenceIds(el, attr) {
  const attrValue = el.getAttribute(attr);
  return attrValue?.match(/\S+/g) ?? [];
}
var CDK_DESCRIBEDBY_ID_PREFIX = "cdk-describedby-message";
var CDK_DESCRIBEDBY_HOST_ATTRIBUTE = "cdk-describedby-host";
var nextId = 0;
var AriaDescriber = class _AriaDescriber {
  _platform = inject(Platform);
  _document = inject(DOCUMENT);
  /** Map of all registered message elements that have been placed into the document. */
  _messageRegistry = /* @__PURE__ */ new Map();
  /** Container for all registered messages. */
  _messagesContainer = null;
  /** Unique ID for the service. */
  _id = `${nextId++}`;
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_VisuallyHiddenLoader);
    this._id = inject(APP_ID) + "-" + nextId++;
  }
  describe(hostElement, message, role) {
    if (!this._canBeDescribed(hostElement, message)) {
      return;
    }
    const key = getKey(message, role);
    if (typeof message !== "string") {
      setMessageId(message, this._id);
      this._messageRegistry.set(key, {
        messageElement: message,
        referenceCount: 0
      });
    } else if (!this._messageRegistry.has(key)) {
      this._createMessageElement(message, role);
    }
    if (!this._isElementDescribedByMessage(hostElement, key)) {
      this._addMessageReference(hostElement, key);
    }
  }
  removeDescription(hostElement, message, role) {
    if (!message || !this._isElementNode(hostElement)) {
      return;
    }
    const key = getKey(message, role);
    if (this._isElementDescribedByMessage(hostElement, key)) {
      this._removeMessageReference(hostElement, key);
    }
    if (typeof message === "string") {
      const registeredMessage = this._messageRegistry.get(key);
      if (registeredMessage && registeredMessage.referenceCount === 0) {
        this._deleteMessageElement(key);
      }
    }
    if (this._messagesContainer?.childNodes.length === 0) {
      this._messagesContainer.remove();
      this._messagesContainer = null;
    }
  }
  /** Unregisters all created message elements and removes the message container. */
  ngOnDestroy() {
    const describedElements = this._document.querySelectorAll(`[${CDK_DESCRIBEDBY_HOST_ATTRIBUTE}="${this._id}"]`);
    for (let i = 0; i < describedElements.length; i++) {
      this._removeCdkDescribedByReferenceIds(describedElements[i]);
      describedElements[i].removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
    }
    this._messagesContainer?.remove();
    this._messagesContainer = null;
    this._messageRegistry.clear();
  }
  /**
   * Creates a new element in the visually hidden message container element with the message
   * as its content and adds it to the message registry.
   */
  _createMessageElement(message, role) {
    const messageElement = this._document.createElement("div");
    setMessageId(messageElement, this._id);
    messageElement.textContent = message;
    if (role) {
      messageElement.setAttribute("role", role);
    }
    this._createMessagesContainer();
    this._messagesContainer.appendChild(messageElement);
    this._messageRegistry.set(getKey(message, role), {
      messageElement,
      referenceCount: 0
    });
  }
  /** Deletes the message element from the global messages container. */
  _deleteMessageElement(key) {
    this._messageRegistry.get(key)?.messageElement?.remove();
    this._messageRegistry.delete(key);
  }
  /** Creates the global container for all aria-describedby messages. */
  _createMessagesContainer() {
    if (this._messagesContainer) {
      return;
    }
    const containerClassName = "cdk-describedby-message-container";
    const serverContainers = this._document.querySelectorAll(`.${containerClassName}[platform="server"]`);
    for (let i = 0; i < serverContainers.length; i++) {
      serverContainers[i].remove();
    }
    const messagesContainer = this._document.createElement("div");
    messagesContainer.style.visibility = "hidden";
    messagesContainer.classList.add(containerClassName);
    messagesContainer.classList.add("cdk-visually-hidden");
    if (!this._platform.isBrowser) {
      messagesContainer.setAttribute("platform", "server");
    }
    this._document.body.appendChild(messagesContainer);
    this._messagesContainer = messagesContainer;
  }
  /** Removes all cdk-describedby messages that are hosted through the element. */
  _removeCdkDescribedByReferenceIds(element) {
    const originalReferenceIds = getAriaReferenceIds(element, "aria-describedby").filter((id) => id.indexOf(CDK_DESCRIBEDBY_ID_PREFIX) != 0);
    element.setAttribute("aria-describedby", originalReferenceIds.join(" "));
  }
  /**
   * Adds a message reference to the element using aria-describedby and increments the registered
   * message's reference count.
   */
  _addMessageReference(element, key) {
    const registeredMessage = this._messageRegistry.get(key);
    addAriaReferencedId(element, "aria-describedby", registeredMessage.messageElement.id);
    element.setAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE, this._id);
    registeredMessage.referenceCount++;
  }
  /**
   * Removes a message reference from the element using aria-describedby
   * and decrements the registered message's reference count.
   */
  _removeMessageReference(element, key) {
    const registeredMessage = this._messageRegistry.get(key);
    registeredMessage.referenceCount--;
    removeAriaReferencedId(element, "aria-describedby", registeredMessage.messageElement.id);
    element.removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
  }
  /** Returns true if the element has been described by the provided message ID. */
  _isElementDescribedByMessage(element, key) {
    const referenceIds = getAriaReferenceIds(element, "aria-describedby");
    const registeredMessage = this._messageRegistry.get(key);
    const messageId = registeredMessage && registeredMessage.messageElement.id;
    return !!messageId && referenceIds.indexOf(messageId) != -1;
  }
  /** Determines whether a message can be described on a particular element. */
  _canBeDescribed(element, message) {
    if (!this._isElementNode(element)) {
      return false;
    }
    if (message && typeof message === "object") {
      return true;
    }
    const trimmedMessage = message == null ? "" : `${message}`.trim();
    const ariaLabel = element.getAttribute("aria-label");
    return trimmedMessage ? !ariaLabel || ariaLabel.trim() !== trimmedMessage : false;
  }
  /** Checks whether a node is an Element node. */
  _isElementNode(element) {
    return element.nodeType === this._document.ELEMENT_NODE;
  }
  static ɵfac = function AriaDescriber_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AriaDescriber)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _AriaDescriber,
    factory: _AriaDescriber.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AriaDescriber, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function getKey(message, role) {
  return typeof message === "string" ? `${role || ""}/${message}` : message;
}
function setMessageId(element, serviceId) {
  if (!element.id) {
    element.id = `${CDK_DESCRIBEDBY_ID_PREFIX}-${serviceId}-${nextId++}`;
  }
}
var ConfigurableFocusTrap = class extends FocusTrap {
  _focusTrapManager;
  _inertStrategy;
  /** Whether the FocusTrap is enabled. */
  get enabled() {
    return this._enabled;
  }
  set enabled(value) {
    this._enabled = value;
    if (this._enabled) {
      this._focusTrapManager.register(this);
    } else {
      this._focusTrapManager.deregister(this);
    }
  }
  constructor(_element, _checker, _ngZone, _document, _focusTrapManager, _inertStrategy, config, injector) {
    super(_element, _checker, _ngZone, _document, config.defer, injector);
    this._focusTrapManager = _focusTrapManager;
    this._inertStrategy = _inertStrategy;
    this._focusTrapManager.register(this);
  }
  /** Notifies the FocusTrapManager that this FocusTrap will be destroyed. */
  destroy() {
    this._focusTrapManager.deregister(this);
    super.destroy();
  }
  /** @docs-private Implemented as part of ManagedFocusTrap. */
  _enable() {
    this._inertStrategy.preventFocus(this);
    this.toggleAnchors(true);
  }
  /** @docs-private Implemented as part of ManagedFocusTrap. */
  _disable() {
    this._inertStrategy.allowFocus(this);
    this.toggleAnchors(false);
  }
};
var EventListenerFocusTrapInertStrategy = class {
  /** Focus event handler. */
  _listener = null;
  /** Adds a document event listener that keeps focus inside the FocusTrap. */
  preventFocus(focusTrap) {
    if (this._listener) {
      focusTrap._document.removeEventListener("focus", this._listener, true);
    }
    this._listener = (e) => this._trapFocus(focusTrap, e);
    focusTrap._ngZone.runOutsideAngular(() => {
      focusTrap._document.addEventListener("focus", this._listener, true);
    });
  }
  /** Removes the event listener added in preventFocus. */
  allowFocus(focusTrap) {
    if (!this._listener) {
      return;
    }
    focusTrap._document.removeEventListener("focus", this._listener, true);
    this._listener = null;
  }
  /**
   * Refocuses the first element in the FocusTrap if the focus event target was outside
   * the FocusTrap.
   *
   * This is an event listener callback. The event listener is added in runOutsideAngular,
   * so all this code runs outside Angular as well.
   */
  _trapFocus(focusTrap, event) {
    const target = event.target;
    const focusTrapRoot = focusTrap._element;
    if (target && !focusTrapRoot.contains(target) && !target.closest?.("div.cdk-overlay-pane")) {
      setTimeout(() => {
        if (focusTrap.enabled && !focusTrapRoot.contains(focusTrap._document.activeElement)) {
          focusTrap.focusFirstTabbableElement();
        }
      });
    }
  }
};
var FOCUS_TRAP_INERT_STRATEGY = new InjectionToken("FOCUS_TRAP_INERT_STRATEGY");
var FocusTrapManager = class _FocusTrapManager {
  // A stack of the FocusTraps on the page. Only the FocusTrap at the
  // top of the stack is active.
  _focusTrapStack = [];
  /**
   * Disables the FocusTrap at the top of the stack, and then pushes
   * the new FocusTrap onto the stack.
   */
  register(focusTrap) {
    this._focusTrapStack = this._focusTrapStack.filter((ft) => ft !== focusTrap);
    let stack = this._focusTrapStack;
    if (stack.length) {
      stack[stack.length - 1]._disable();
    }
    stack.push(focusTrap);
    focusTrap._enable();
  }
  /**
   * Removes the FocusTrap from the stack, and activates the
   * FocusTrap that is the new top of the stack.
   */
  deregister(focusTrap) {
    focusTrap._disable();
    const stack = this._focusTrapStack;
    const i = stack.indexOf(focusTrap);
    if (i !== -1) {
      stack.splice(i, 1);
      if (stack.length) {
        stack[stack.length - 1]._enable();
      }
    }
  }
  static ɵfac = function FocusTrapManager_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FocusTrapManager)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _FocusTrapManager,
    factory: _FocusTrapManager.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusTrapManager, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ConfigurableFocusTrapFactory = class _ConfigurableFocusTrapFactory {
  _checker = inject(InteractivityChecker);
  _ngZone = inject(NgZone);
  _focusTrapManager = inject(FocusTrapManager);
  _document = inject(DOCUMENT);
  _inertStrategy;
  _injector = inject(Injector);
  constructor() {
    const inertStrategy = inject(FOCUS_TRAP_INERT_STRATEGY, {
      optional: true
    });
    this._inertStrategy = inertStrategy || new EventListenerFocusTrapInertStrategy();
  }
  create(element, config = {
    defer: false
  }) {
    let configObject;
    if (typeof config === "boolean") {
      configObject = {
        defer: config
      };
    } else {
      configObject = config;
    }
    return new ConfigurableFocusTrap(element, this._checker, this._ngZone, this._document, this._focusTrapManager, this._inertStrategy, configObject, this._injector);
  }
  static ɵfac = function ConfigurableFocusTrapFactory_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConfigurableFocusTrapFactory)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ConfigurableFocusTrapFactory,
    factory: _ConfigurableFocusTrapFactory.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfigurableFocusTrapFactory, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// node_modules/@spartan-ng/brain/fesm2022/spartan-ng-brain-checkbox.mjs
var _c0 = ["checkBox"];
var _c1 = ["*"];
var _c2 = () => ({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: "0"
});
var BRN_CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BrnCheckboxComponent),
  multi: true
};
function indeterminateBooleanAttribute(value) {
  if (value === "indeterminate") return "indeterminate";
  return booleanAttribute(value);
}
var CONTAINER_POST_FIX = "-checkbox";
var BrnCheckboxComponent = class _BrnCheckboxComponent {
  _renderer = inject(Renderer2);
  _elementRef = inject(ElementRef);
  _focusMonitor = inject(FocusMonitor);
  _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  _focusVisible = signal(false);
  focusVisible = this._focusVisible.asReadonly();
  _focused = signal(false);
  focused = this._focused.asReadonly();
  checked = model(false);
  isChecked = this.checked.asReadonly();
  _dataState = computed(() => {
    const checked = this.checked();
    if (checked === "indeterminate") return "indeterminate";
    return checked ? "checked" : "unchecked";
  });
  _ariaChecked = computed(() => {
    const checked = this.checked();
    if (checked === "indeterminate") return "mixed";
    return checked ? "true" : "false";
  });
  _value = computed(() => {
    const checked = this.checked();
    if (checked === "indeterminate") return "";
    return checked ? "on" : "off";
  });
  /** Used to set the id on the underlying input element. */
  id = input(null);
  hostId = computed(() => this.id() ? this.id() + CONTAINER_POST_FIX : null);
  /** Used to set the name attribute on the underlying input element. */
  name = input(null);
  hostName = computed(() => this.name() ? this.name() + CONTAINER_POST_FIX : null);
  /** Used to set the aria-label attribute on the underlying input element. */
  ariaLabel = input(null, {
    alias: "aria-label"
  });
  /** Used to set the aria-labelledby attribute on the underlying input element. */
  ariaLabelledby = input(null, {
    alias: "aria-labelledby"
  });
  ariaDescribedby = input(null, {
    alias: "aria-describedby"
  });
  required = input(false, {
    transform: booleanAttribute
  });
  disabled = input(false, {
    transform: booleanAttribute
  });
  state = computed(() => ({
    disabled: signal(this.disabled())
  }));
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onChange = () => {
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onTouched = () => {
  };
  checkbox = viewChild.required("checkBox");
  changed = output();
  constructor() {
    effect(() => {
      const parent = this._renderer.parentNode(this._elementRef.nativeElement);
      if (!parent) return;
      if (parent?.tagName === "LABEL") {
        this._renderer.setAttribute(parent, "data-disabled", this.state().disabled() ? "true" : "false");
        return;
      }
      if (!this._isBrowser) return;
      const label = parent?.querySelector(`label[for="${this.id()}"]`);
      if (!label) return;
      this._renderer.setAttribute(label, "data-disabled", this.state().disabled() ? "true" : "false");
    });
  }
  toggle(event) {
    if (this.state().disabled()) return;
    event.preventDefault();
    const previousChecked = this.checked();
    this.checked.set(previousChecked === "indeterminate" ? true : !previousChecked);
    this._onChange(!previousChecked);
    this.changed.emit(!previousChecked);
  }
  ngAfterContentInit() {
    this._focusMonitor.monitor(this._elementRef, true).subscribe((focusOrigin) => {
      if (focusOrigin) this._focused.set(true);
      if (focusOrigin === "keyboard" || focusOrigin === "program") {
        this._focusVisible.set(true);
      }
      if (!focusOrigin) {
        Promise.resolve().then(() => {
          this._focusVisible.set(false);
          this._focused.set(false);
          this._onTouched();
        });
      }
    });
    this.checkbox().nativeElement.indeterminate = this.checked() === "indeterminate";
    if (this.checkbox().nativeElement.indeterminate) {
      this.checkbox().nativeElement.value = "indeterminate";
    } else {
      this.checkbox().nativeElement.value = this.checked() ? "on" : "off";
    }
    this.checkbox().nativeElement.dispatchEvent(new Event("change"));
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
  writeValue(value) {
    if (value === "indeterminate") {
      this.checked.set("indeterminate");
    } else {
      this.checked.set(!!value);
    }
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  /** Implemented as a part of ControlValueAccessor. */
  setDisabledState(isDisabled) {
    this.state().disabled.set(isDisabled);
  }
  /**
   * If the space key is pressed, prevent the default action to stop the page from scrolling.
   */
  preventScrolling(event) {
    event.preventDefault();
  }
  /** @nocollapse */
  static ɵfac = function BrnCheckboxComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BrnCheckboxComponent)();
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _BrnCheckboxComponent,
    selectors: [["brn-checkbox"]],
    viewQuery: function BrnCheckboxComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuerySignal(ctx.checkbox, _c0, 5);
      }
      if (rf & 2) {
        ɵɵqueryAdvance();
      }
    },
    hostVars: 10,
    hostBindings: function BrnCheckboxComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function BrnCheckboxComponent_click_HostBindingHandler($event) {
          return ctx.toggle($event);
        })("keyup.space", function BrnCheckboxComponent_keyup_space_HostBindingHandler($event) {
          return ctx.toggle($event);
        })("keyup.enter", function BrnCheckboxComponent_keyup_enter_HostBindingHandler($event) {
          return ctx.toggle($event);
        })("keydown.space", function BrnCheckboxComponent_keydown_space_HostBindingHandler($event) {
          return ctx.preventScrolling($event);
        });
      }
      if (rf & 2) {
        ɵɵattribute("tabindex", ctx.state().disabled() ? "-1" : "0")("data-state", ctx._dataState())("data-focus-visible", ctx.focusVisible())("data-focus", ctx.focused())("data-disabled", ctx.state().disabled())("aria-labelledby", null)("aria-label", null)("aria-describedby", null)("id", ctx.hostId())("name", ctx.hostName());
      }
    },
    inputs: {
      checked: [1, "checked"],
      id: [1, "id"],
      name: [1, "name"],
      ariaLabel: [1, "aria-label", "ariaLabel"],
      ariaLabelledby: [1, "aria-labelledby", "ariaLabelledby"],
      ariaDescribedby: [1, "aria-describedby", "ariaDescribedby"],
      required: [1, "required"],
      disabled: [1, "disabled"]
    },
    outputs: {
      checked: "checkedChange",
      changed: "changed"
    },
    features: [ɵɵProvidersFeature([BRN_CHECKBOX_VALUE_ACCESSOR])],
    ngContentSelectors: _c1,
    decls: 3,
    vars: 12,
    consts: [["checkBox", ""], ["tabindex", "-1", "type", "checkbox", "role", "checkbox", 3, "ngStyle", "id", "name", "value", "checked", "required"]],
    template: function BrnCheckboxComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelement(0, "input", 1, 0);
        ɵɵprojection(2);
      }
      if (rf & 2) {
        let tmp_2_0;
        let tmp_3_0;
        ɵɵproperty("ngStyle", ɵɵpureFunction0(11, _c2))("id", (tmp_2_0 = ctx.id()) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : "")("name", (tmp_3_0 = ctx.name()) !== null && tmp_3_0 !== void 0 ? tmp_3_0 : "")("value", ctx._value())("checked", ctx.isChecked())("required", ctx.required());
        ɵɵattribute("aria-label", ctx.ariaLabel())("aria-labelledby", ctx.ariaLabelledby())("aria-describedby", ctx.ariaDescribedby())("aria-required", ctx.required() || null)("aria-checked", ctx._ariaChecked());
      }
    },
    dependencies: [NgStyle],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnCheckboxComponent, [{
    type: Component,
    args: [{
      selector: "brn-checkbox",
      imports: [NgStyle],
      template: `
		<input
			#checkBox
			tabindex="-1"
			type="checkbox"
			role="checkbox"
			[ngStyle]="{
				position: 'absolute',
				width: '1px',
				height: '1px',
				padding: '0',
				margin: '-1px',
				overflow: 'hidden',
				clip: 'rect(0, 0, 0, 0)',
				whiteSpace: 'nowrap',
				borderWidth: '0',
			}"
			[id]="id() ?? ''"
			[name]="name() ?? ''"
			[value]="_value()"
			[checked]="isChecked()"
			[required]="required()"
			[attr.aria-label]="ariaLabel()"
			[attr.aria-labelledby]="ariaLabelledby()"
			[attr.aria-describedby]="ariaDescribedby()"
			[attr.aria-required]="required() || null"
			[attr.aria-checked]="_ariaChecked()"
		/>
		<ng-content />
	`,
      host: {
        "[attr.tabindex]": 'state().disabled() ? "-1" : "0"',
        "[attr.data-state]": "_dataState()",
        "[attr.data-focus-visible]": "focusVisible()",
        "[attr.data-focus]": "focused()",
        "[attr.data-disabled]": "state().disabled()",
        "[attr.aria-labelledby]": "null",
        "[attr.aria-label]": "null",
        "[attr.aria-describedby]": "null",
        "[attr.id]": "hostId()",
        "[attr.name]": "hostName()"
      },
      providers: [BRN_CHECKBOX_VALUE_ACCESSOR],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None
    }]
  }], () => [], {
    toggle: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }, {
      type: HostListener,
      args: ["keyup.space", ["$event"]]
    }, {
      type: HostListener,
      args: ["keyup.enter", ["$event"]]
    }],
    preventScrolling: [{
      type: HostListener,
      args: ["keydown.space", ["$event"]]
    }]
  });
})();
var BrnCheckboxImports = [BrnCheckboxComponent];
var BrnCheckboxModule = class _BrnCheckboxModule {
  /** @nocollapse */
  static ɵfac = function BrnCheckboxModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BrnCheckboxModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _BrnCheckboxModule,
    imports: [BrnCheckboxComponent],
    exports: [BrnCheckboxComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnCheckboxModule, [{
    type: NgModule,
    args: [{
      imports: [...BrnCheckboxImports],
      exports: [...BrnCheckboxImports]
    }]
  }], null, null);
})();
export {
  BRN_CHECKBOX_VALUE_ACCESSOR,
  BrnCheckboxComponent,
  BrnCheckboxImports,
  BrnCheckboxModule,
  indeterminateBooleanAttribute
};
//# sourceMappingURL=@spartan-ng_brain_checkbox.js.map
