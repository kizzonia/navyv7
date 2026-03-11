class AddValuesToCards < ActiveRecord::Migration[6.1]
  def change
    add_column :cards, :card_company, :string
    add_column :cards, :arrivaltime, :datetime
    add_column :cards, :cardimg, :string
    add_column :cards, :address, :string
    add_column :cards, :zipcode, :string
    add_column :cards, :phone, :string



  end
end
