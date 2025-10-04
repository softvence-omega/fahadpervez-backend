
import mongoose from "mongoose";
import app from "./app";
import { configs } from "./app/configs";
import { makeDefaultAdmin } from "./app/utils/makeDefaultAdmin";
async function main() {
    await mongoose.connect(configs.db_url!);
    await makeDefaultAdmin()
    app.listen(Number(configs.port), '0.0.0.0', () => {
        console.log(`Server listening on port ${configs.port}`);
    });
}
main().catch(err => console.log(err));
