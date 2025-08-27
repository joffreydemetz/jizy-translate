import { jPackConfig } from 'jizy-packer';

const jPackData = function () {
    jPackConfig.sets({
        name: 'jTranslate',
        alias: 'jizy-translate',
    });

    jPackConfig.set("onCheckConfig", () => { });
    jPackConfig.set("onGenerateBuildJs", (code) => code);
    jPackConfig.set("onGenerateWrappedJs", (wrapped) => wrapped);
    jPackConfig.set("onPacked", () => { });
};

export default jPackData;
