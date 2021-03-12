import express from 'express';

const router = express.Router();
router.use('/',(req,res)=>{
        res.send('te5demm');
});

export default router;