/**
 * Axios is a simple promise based HTTP client for the browser and node.js.
 * Axios provides a simple to use library in a small package with a very extensible interface.
 * @url https://axios-http.com/
 * */

import axios from "axios";

// Import constants, functions and services
const ENV_IMPORT = `${process.env.NEXT_PUBLIC_BACKEND_URL}apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`;

axios.defaults.baseURL = ENV_IMPORT;

console.log(ENV_IMPORT, "ENV")

// process all failed requests using this queue array
let failedQueue: any = [];

// Response Interceptor
axios.interceptors.response.use(
    (response:any) => {
        // Handle successful response
        return response;
    },
    (error:any) => {
        //log error
       
        return Promise.reject(error);
    }
);

/**
 * Clear all failed queues
 * @param error Error
 * @param token Access Token
 * */
const processQueue = (error: any, token = null) => {
    failedQueue.forEach((promise: any) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });
    failedQueue = [];
};


// Send a GET request (SetupGroup Port)
const getSetupServices = (url: string, data = null) => {
    return new Promise(function (resolve, reject) {
        console.log(ENV_IMPORT, "ENV")
        axios.defaults.baseURL = ENV_IMPORT;
        axios
            .get(url, {params: data ? data : {}})
            .then((data:any) => {
                resolve(data);
            })
            .catch((err:any) => {
                reject(err);
            });
    });
};
const postSetupService = (url: string, data: any) => {
    return new Promise(function (resolve, reject) {
        axios.defaults.baseURL = ENV_IMPORT;
        axios
            .post(url, data)
            .then((data:any) => {
                resolve(data);
            })
            .catch((err:any) => {
                reject(err);
            });
    });
};
const putSetupService = (url: string, data: any) => {
    return new Promise(function (resolve, reject) {
        axios.defaults.baseURL = ENV_IMPORT;
        axios
            .put(url, data)
            .then((data:any) => {
                resolve(data);
            })
            .catch((err:any) => {
                reject(err);
            });
    });
};

// Send a POST request (User Service Port)
const postUserService = (url: string, data: any) => {
    return new Promise(function (resolve, reject) {
        axios.defaults.baseURL = ENV_IMPORT;
        axios
            .post(url, data)
            .then((data:any) => {
                resolve(data);
            })
            .catch((err:any) => {
                reject(err);
            });
    });
};

// Send a POST FILEUPLOAD request
const fileUploadService = (url: string, data: any) => {
    return new Promise(function (resolve, reject) {
        axios
            .post(url, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((data:any) => {
                resolve(data);
            })
            .catch((err:any) => {
                reject(err);
            });
    });
};

// Send a PUT request
const putService = (url: string, data: any) => {
    return new Promise(function (resolve, reject) {
        axios
            .put(url, data)
            .then((data:any) => {
                resolve(data);
            })
            .catch((err:any) => {
                reject(err);
            });
    });
};

// Send a DELETE request
const deleteService = (url: string) => {
    return new Promise(function (resolve, reject) {
        axios
            .delete(url)
            .then((data:any) => {
                resolve(data);
            })
            .catch((err:any) => {
                reject(err);
            });
    });
};


const logService = (logOptions: any) => {
    return new Promise(function (resolve, reject) {
        axios
            .post("/log", logOptions)
            .then((data:any) => {
                resolve(data);
            })
            .catch((err:any) => {
                reject(err);
            });
    });
}

export const axiosService = {
    putSetupService,
    postSetupService,
    postUserService,
    getSetupServices,
    fileUploadService,
    deleteService,
    putService,
    logService
};
