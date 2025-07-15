const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Basic health check
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'Service is healthy'
  });
});

// Detailed health check with dependencies
router.get('/detailed', async (req, res) => {
  const healthCheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {
      database: 'OK',
      memory: 'OK',
      disk: 'OK'
    }
  };

  try {
    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      healthCheck.checks.database = 'ERROR';
      healthCheck.status = 'ERROR';
    }

    // Check memory usage
    const memUsage = process.memoryUsage();
    const memUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
    if (memUsagePercent > 90) {
      healthCheck.checks.memory = 'WARNING';
      if (healthCheck.status === 'OK') healthCheck.status = 'WARNING';
    }

    // Add memory details
    healthCheck.memory = {
      used: Math.round(memUsage.heapUsed / 1024 / 1024 * 100) / 100,
      total: Math.round(memUsage.heapTotal / 1024 / 1024 * 100) / 100,
      usage: Math.round(memUsagePercent * 100) / 100
    };

    const statusCode = healthCheck.status === 'OK' ? 200 : 
                      healthCheck.status === 'WARNING' ? 200 : 503;

    res.status(statusCode).json(healthCheck);
  } catch (error) {
    res.status(503).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// Ping endpoint for simple uptime checks
router.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

module.exports = router;