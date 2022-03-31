// # Import: NodeJS Packages
import fs from 'fs';
import path from 'path';


export async function classImporter (rel__dirname?: string) {
    const importer = async (from?) => {
		const imported = {};
		const joinPath = function (...args) {
			return '.' + path.sep + path.join(...args);
		};
		const fsPath = path.join( process.cwd() + path.sep + rel__dirname );

		return await new Promise( resolve => {
			fs.readdirSync(fsPath).forEach(async (name) => {
				const info = fs.statSync(path.join(fsPath, name));
				if (info.isDirectory()) {
					imported[name] = importer(joinPath(from, name));
				} else {
					// only import files that we can `require`
					const ext = path.extname(name);
					const base = path.basename(name, ext);
					if (require.extensions[ext]) {
						// const importedClass = <any>require(path.join(fsPath, name))
						// imported[base] = new importedClass();
						// eslint-disable-next-line @typescript-eslint/no-var-requires
						// imported[base] = await import(path.join(fsPath, name));
						const requireFile = (async () => {
							const fileName = path.join(fsPath, name);
							const file = await import( fileName );
							return file;
						})().then(classFile => {
							const classInstance = new classFile[base]();
							return classInstance;
						})
						.catch(error => {
							// Handle/report error
							console.error(error);
						});

						imported[base] = await requireFile;
						console.log( "🟠🟠🟠", imported[base] );
						// imported[base] = new imported[base];
					} else {
						console.log('cannot require ', ext);
					}
				}
			});
			resolve(true);
		}).then( () => {
			console.log('🔥🔥', imported);
			return imported;

		});

	}
	return await importer(rel__dirname);
};

