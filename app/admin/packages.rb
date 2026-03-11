ActiveAdmin.register Package do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
   permit_params :title, :pkimg, :sub_title, :body, :slug, :duration, :rate, :droi, :icon
  #
  #
  # or
  #
  # permit_params do
  #   permitted = [:title, :sub_title, :rate, :body, :slug, :duration, :pkgimg]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  form(:html => { :multipart => true }) do |f|
   f.inputs do
     f.input :icon
     f.input :title
     f.input :pkimg, as: :file
     f.input :rate
     f.input :droi
     f.input :duration
     f.input :sub_title, placeholder: "description"
     f.input :body,  as: :quill_editor
   end
   f.actions
  end


   controller do
          def find_resource
            scoped_collection.friendly.find(params[:id])
          end
        end


end
