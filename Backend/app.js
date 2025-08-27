import express from 'express';
import connectionDB from './connectiondb.js';

const app = express();

export default app;

connectionDB();

