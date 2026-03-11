require "application_system_test_case"

class LoansTest < ApplicationSystemTestCase
  setup do
    @loan = loans(:one)
  end

  test "visiting the index" do
    visit loans_url
    assert_selector "h1", text: "Loans"
  end

  test "creating a Loan" do
    visit loans_url
    click_on "New Loan"

    fill_in "Amount", with: @loan.amount
    fill_in "Budget", with: @loan.budget
    fill_in "Business name", with: @loan.business_name
    fill_in "Date", with: @loan.date
    fill_in "Desc", with: @loan.desc
    fill_in "Email", with: @loan.email
    fill_in "First name", with: @loan.first_name
    fill_in "Interest", with: @loan.interest
    fill_in "Last name", with: @loan.last_name
    fill_in "Name", with: @loan.name
    fill_in "Project desc", with: @loan.project_desc
    fill_in "Project name", with: @loan.project_name
    fill_in "Project size", with: @loan.project_size
    fill_in "Slug", with: @loan.slug
    fill_in "User", with: @loan.user_id
    click_on "Create Loan"

    assert_text "Loan was successfully created"
    click_on "Back"
  end

  test "updating a Loan" do
    visit loans_url
    click_on "Edit", match: :first

    fill_in "Amount", with: @loan.amount
    fill_in "Budget", with: @loan.budget
    fill_in "Business name", with: @loan.business_name
    fill_in "Date", with: @loan.date
    fill_in "Desc", with: @loan.desc
    fill_in "Email", with: @loan.email
    fill_in "First name", with: @loan.first_name
    fill_in "Interest", with: @loan.interest
    fill_in "Last name", with: @loan.last_name
    fill_in "Name", with: @loan.name
    fill_in "Project desc", with: @loan.project_desc
    fill_in "Project name", with: @loan.project_name
    fill_in "Project size", with: @loan.project_size
    fill_in "Slug", with: @loan.slug
    fill_in "User", with: @loan.user_id
    click_on "Update Loan"

    assert_text "Loan was successfully updated"
    click_on "Back"
  end

  test "destroying a Loan" do
    visit loans_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Loan was successfully destroyed"
  end
end
