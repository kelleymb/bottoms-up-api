const CollectionsService = {
    getByMainLiquor(knex, main_liquor) {
        return knex
            .select('*')
            .from('collections')
            .where('main_liquor', main_liquor)
    }
}

module.exports = CollectionsService