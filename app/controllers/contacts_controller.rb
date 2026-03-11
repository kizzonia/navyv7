class ContactsController < InheritedResources::Base
  def new
    @welcomes = Welcome.all
    @headers = Header.all
    @blogs = Blog.all.order('created_at DESC')
    @feedbacks = Feedback.all.order('created_at DESC')

    @contact = Contact.new
  end

  def create
    @headers = Header.all

    @contact = Contact.new(contact_params)
    respond_to do |format|
      if @contact.save
        contact = @contact
        ContactMailer.contact_email(contact).deliver
        format.html { redirect_to root_path, notice: 'Thank You. we get back to you right away' }
      else
        format.html { render :new }
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end
  end
private

    def contact_params
      params.require(:contact).permit(:email, :name, :phone, :body)
    end

end
