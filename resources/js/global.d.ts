import * as NeutralinoLib from 'neutralino.d.ts';

declare global {
    const Neutralino: typeof NeutralinoLib;

    /**
     * Source: {@link https://neutralino.js.org/docs/api/global-variables}
     */
    const NL_OS: "Linux" | "Windows" | "Darwin";
    const NL_ARCH: "x64" | "arm" | "itanium" | "ia32" | "unknown";
    const NL_APPID: string;
    const NL_APPVERSION: string;
    const NL_PORT: number;
    const NL_MODE: "window" | "browser" | "cloud" | "chrome";
    const NL_VERSION: string;
    const NL_CVERSION: string;
    const NL_CWD: string;
    const NL_PATH: string;
    const NL_DATAPATH: string;
    const NL_ARGS: string[];
    const NL_PID: number;
    const NL_RESMODE: "bundle" | "directory";
    const NL_EXTENABLED: boolean;
    const NL_COMMIT: string;
    const NL_CCOMMIT: string;
    const NL_CMETHODS: string[];
    const NL_WSAVSTLOADED: boolean;
    const NL_GINJECTED: boolean;
    const NL_CINJECTED: boolean;
    const NL_LOCALE: string;
    const NL_COMPDATA: unknown;
}

export interface UserSettings {
    pomodoro: {
        timerDurationMinutes: string
    }
}