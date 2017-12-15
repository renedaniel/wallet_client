import MetadataTask from './tasks/metadata_task';
import Util from './../utils/util';
import Translator from './../utils/translator';

export async function getMetadata() {
    return Util.performSimpleRequest(MetadataTask)
}

export async function loadInitApis() {
    const [metadata] = await Promise.all([
        getMetadata()
    ]);

    const { translations } = metadata;
    Translator.setData(translations);

    return new Promise(resolve => {
        resolve();
    });
}