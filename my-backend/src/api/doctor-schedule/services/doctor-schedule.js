'use strict';

/**
 * doctor-schedule service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::doctor-schedule.doctor-schedule');
