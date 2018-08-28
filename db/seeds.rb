5.times do
  Article.create({
    title: Faker::Book.title,
    body: Faker::Lorem.sentence
  })
end

AdminUser.create!(email: 'admin@example.com', 
                  password: 'password', 
                  password_confirmation: 'password')