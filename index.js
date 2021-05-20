/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const NS = 'plugin:http-trace';
const debug = require('debug')(NS);

module.exports = {
  Plugin
};

function Plugin(script, events) {
  this.script = script;
  this.events = events;

  attachScenarioHooks(script, [{
    type: 'afterResponse',
    name: 'httpTracePluginTrace',
    hook: this.traceHttp.bind(this)
  }]);

  return this;
};

Plugin.prototype.traceHttp = function(req, res, userContext, events, done) {
  console.log(JSON.stringify({
    req: {
      url: req.url,
      method: req.method,
      headers: req.headers,
    },

    res: {
      headers: res.headers,
      body: res.body, // TODO: Handle when large
      timings: res.timings
    },

    vars: userContext.vars
  }));

  return done();
}

Plugin.prototype.cleanup = function(done) {
  return done();
};


function attachScenarioHooks(script, specs) {
  const scenarios = script.scenarios;

  if (typeof scenarios !== 'object' || scenarios.length < 1) {

    return;
  }

  scenarios.forEach((scenario) => {
    specs.forEach((spec) => {
      // console.log(spec.engine, scenario.engine);
      // if (spec.engine && spec.engine !== scenario.engine) {
      //   return;
      // }

      scenario[spec.type] = [].concat(scenario[spec.type] || []);
      scenario[spec.type].push(spec.name);
      addHelperFunction(script, spec.name, spec.hook);
    });
  });
}

function addHelperFunction(script, name, func) {
  if (!script.config.processor) {
    script.config.processor = {};
  }

  script.config.processor[name] = func;
}
