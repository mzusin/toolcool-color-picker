import path from 'path';
import fs from 'fs';

const esbuildCopyPlugin = {
    name: 'copy',
    setup(build) {
        build.onEnd(result => {
            const dirname = process.cwd();
            const sourceAbsPath = path.join(dirname, build.initialOptions.outfile);
            const fileName = path.basename(build.initialOptions.outfile);
            const targetAbsPath = path.join(dirname, '/dist/', fileName);
            fs.cpSync(sourceAbsPath, targetAbsPath,{
                recursive: true,
                force: true,
                dereference: true
            });
        })
    },
};

export default esbuildCopyPlugin;