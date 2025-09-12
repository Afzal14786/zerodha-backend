import app from './app.js'

const port = process.env.PORT || 5174;

app.listen(port, ()=> {
    console.log(`port is running on ${port}`);
}).on("error", (err)=> {
    console.error(`Failed to starrt the server: ${err}`);
    process.exit(1);
});

