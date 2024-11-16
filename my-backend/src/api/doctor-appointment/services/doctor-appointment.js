'use strict';

/**
 * doctor-appointment service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::doctor-appointment.doctor-appointment');
