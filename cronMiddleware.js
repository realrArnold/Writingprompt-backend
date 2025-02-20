
// Secret key to secure the endpoint
const CRON_SECRET = process.env.CRON_SECRET 

// Middleware to verify the request is from cron-job.org
const verifyCronSecret = (req, res, next) => {
  const providedSecret = req.headers['x-cron-secret'];
  
  if (!providedSecret || providedSecret !== CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};

module.exports = verifyCronSecret;