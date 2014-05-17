# == Schema Information
#
# Table name: users
#
#  id                    :integer          not null, primary key
#  username              :string(255)
#  email                 :text
#  password              :text
#  password_confirmation :text
#  created_at            :datetime
#  updated_at            :datetime
#

class User < ActiveRecord::Base
  attr_accessible :username, :email, :password, :password_confirmation
  
  #form validation
  validates :username, :presence => true, :uniqueness => true
  validates :email, :presence => true
  has_secure_password

  has_many :settings
end
