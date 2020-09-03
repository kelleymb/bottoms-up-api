const PostRecipeService = {
    insertRecipe(knex, recipe) {
        return knex
            .insert(recipe)
            .into('collections')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = PostRecipeService