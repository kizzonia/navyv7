class AddLoanseoToWelcomes < ActiveRecord::Migration[6.1]
  def change
    add_column :welcomes, :loantitle, :string
    add_column :welcomes, :loansummary, :string
    add_column :welcomes, :loandesc, :string
    add_column :welcomes, :loanfavimg, :string
  end
end
