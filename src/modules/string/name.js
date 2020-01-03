export const checkComponentName = name => {
    if (name.lastIndexOf('-') !== name.indexOf('-'))
        return false;
    for (let char of name) {
        if (isNaN(char) === false)
            return false;
    }
    return true;
};

export const getComponentName = name => {
    const nameArr = name.split('-');
    const first = nameArr[0].charAt(0).toUpperCase() + nameArr[0].slice(1);
    const second = nameArr[1].charAt(0).toUpperCase() + nameArr[1].slice(1);
    return `${first}${second}`
};

export const getListDirectory = (srcDirectory,componentsDirectory,componentDirectory) => (
    [
        {
            name: srcDirectory,
            checkIfExist: false
        },
        {
            name: componentsDirectory,
            checkIfExist: false
        },
        {
            name: componentDirectory,
            checkIfExist: true
        }
    ]
);
