class AddVerifedToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :verified, :boolean
    add_column :users, :body, :text
  end
end
