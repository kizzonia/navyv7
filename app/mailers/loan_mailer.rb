class LoanMailer < ApplicationMailer
  default :from => "noreply@navyscreditunion.com"
  def loan_email(user, loan)
    @user = user
    @loan = loan
     mail(to: user.email, subject: 'Loan Onboarding')
  end
end
