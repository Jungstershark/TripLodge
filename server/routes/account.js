import { Router } from 'express';
var router = Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('dummy account info!');
});

export default router;
