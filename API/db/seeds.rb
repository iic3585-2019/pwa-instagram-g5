# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

fco = User.create(id: 1, user_name: "Francisco Olivares") 
gabs = User.create(id: 2, user_name: "Gabriel Valenzuela")

fco.friends << gabs

Post.create(content: "Este es el primer post de fco", user: fco)
Post.create(content: "Este es el segundo post de fco", user: fco)
Post.create(content: "Este es el tercero post de fco", user: fco)

Post.create(content: "Este es el primer post de gabs", user: gabs)
Post.create(content: "Este es el segundo post de gabs", user: gabs)
Post.create(content: "Este es el tercero post de gabs", user: gabs)