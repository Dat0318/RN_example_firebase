

export const fetchData = async (callback?: any) => {
    await setTimeout(() => {
        console.log('aikanvasl');
        let data = {
            name: 'any',
        }
        callback !== undefined && callback(data);
    }, 1000);
}