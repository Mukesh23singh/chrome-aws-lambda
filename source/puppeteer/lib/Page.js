let Super = null;

try {
  Super = require('puppeteer/lib/cjs/puppeteer/common/Page').Page;
} catch (error) {
  Super = require('puppeteer-core/lib/cjs/common/Page').Page;
}

/**
 * Aborts requests for every other resource type.
 */
Super.prototype.allow = function (...resources) {
  return this.setRequestInterception(true).then(() => {
    this.on('request', (request) => {
      if (resources.includes(request.resourceType()) === true) {
        return request.continue();
      }

      return request.abort();
    });

    return true;
  });
};

/**
 * Aborts requests for the specified resource types.
 */
Super.prototype.block = function (...resources) {
  return this.setRequestInterception(true).then(() => {
    this.on('request', (request) => {
      if (resources.includes(request.resourceType()) === true) {
        return request.abort();
      }

      return request.continue();
    });

    return true;
  });
};

/**
 * Clicks an element and waits for navigation to finish.
 */
Super.prototype.clickAndWaitForNavigation = function (selector, options = null) {
  if (options == null) {
    options = {
      waitUntil: [
        'domcontentloaded',
        'load',
      ],
    };
  }

  let promises = [
    this.waitForNavigation(options),
    this.click(selector),
  ];

  return Promise.all(promises).then((value) => value.shift());
};

/**
 * Returns the total number of elements that match the selector.
 */
Super.prototype.count = function (selector) {
  return this.mainFrame().count(selector);
};

/**
 * Checks whether at least one element matching the selector exists.
 */
Super.prototype.exists = function (selector) {
  return this.mainFrame().exists(selector);
};

/**
 * Fills a `form` with a variable number of inputs and returns its filled state.
 */
Super.prototype.fill = function (form, data, heuristic = 'name') {
  return this.mainFrame().fill(form, data, heuristic);
};

/**
 * @deprecated Use `page.goto` instead.
 */
Super.prototype.go = async function (url, options = null) {
  if (options == null) {
    options = {
      waitUntil: [
        'domcontentloaded',
        'load',
      ],
    };
  }

  return await this.goto(url, options);
};

/**
 * Returns normalized number(s) found in the given selector.
 */
Super.prototype.number = function (selector, decimal = '.', index = null, property = 'textContent') {
  return this.mainFrame().number(selector, decimal, index, property);
};

/**
 * Selects multiple `select` options by label and returns the values of the selection.
 */
Super.prototype.selectByLabel = function (selector, ...values) {
  return this.mainFrame().selectByLabel(selector, ...values);
};

/**
 * Returns normalized text found in the given selector.
 */
Super.prototype.string = function (selector, property = 'textContent') {
  return this.mainFrame().string(selector, property);
};

/**
 * Waits for element to be present in DOM and to be visible.
 */
Super.prototype.waitUntilVisible = function (selector, timeout = null) {
  return this.mainFrame().waitUntilVisible(selector, timeout);
};

/**
 * Waits for element to not be found in the DOM or to be hidden.
 */
Super.prototype.waitWhileVisible = function (selector, timeout = null) {
  return this.mainFrame().waitWhileVisible(selector, timeout);
};
