
class Enchere {

    static async getEnchereById(idEnchere) {
        let enchere = await axios.get('http://localhost:3002/api/encheres/' + idEnchere);
        return enchere.data;
    }

}