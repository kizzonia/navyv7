class AddYoutubeToWelcomes < ActiveRecord::Migration[5.2]
  def change
    add_column :welcomes, :youtube, :string
  end
end
