# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all

u1 = User.create(:username => 'Charlie', :email => 'annecharlotte.gerard@gmail.com', :password => 'password', :password_confirmation => 'password')
u1.admin = true
u1.save

u2 = User.create(:username => 'test', :email => 'test@test.com', :password => 'test', :password_confirmation => 'test');
u2.admin = false
u2.save