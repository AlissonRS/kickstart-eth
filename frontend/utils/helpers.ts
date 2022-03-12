const isString = (data: any): data is string => {
    return typeof data === 'string';
};

export default isString;