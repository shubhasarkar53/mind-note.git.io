import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router();



router.get('/mindnotes', isAuthenticated , (req, res) => {

});

router.post('/mindnote/new', (req, res) => {
    res.send('get');
});

router.patch('/mindnote/:id', (req, res) => {
    res.send('get');
});

router.delete('/mindnote/:id', (req, res) => {
    res.send('get');
});

router.post('/mindnote/share/:id', (req, res) => {
    res.send('get');
});

router.get('/mindnote/:hash', (req, res) => {
    res.send('get');
});

export default router;