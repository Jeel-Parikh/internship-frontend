import { yupToFormErrors } from 'formik';
import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const aadharCardRegExp = /^\d{4}\d{4}\d{4}$/
const panCardRegExp = /[A-Z]{5}[0-9]{4}[A-Z]{1}/
const isAlpha = /[a-zA-Z ]+/
const isAlphaNumeric = /[0-9a-zA-Z ]+/
const isSpace = /^\S+$/
const isUpiId = /^[\w.-]+@[\w.-]+$/
function noWhitespace() {
  return this.transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value));
}
Yup.addMethod(Yup.number, 'noWhitespace', noWhitespace);

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .min(10, 'Number must have 5 characters')
    .required('Please enter a registered Email')
    .matches(isSpace, 'Spaces are not allowed')
  ,
  password: Yup.string()
    .label('Password')
    .matches(isSpace, 'Spaces are not allowed')
    .min(4, "minimum pin is 4 digits")
    .required(),
});
export const registerSchema = Yup.object().shape({
  name: Yup.string().min(2, "Name mush contains atleast two charachters").
    required("Please, enter your name,it can not be left empty")
  ,
  email: Yup.string()
    .min(5, 'email must have 5 characters')
    .required('Please enter a registered Email')
    .matches(isSpace, 'Spaces are not allowed')
  ,
  password: Yup.string()
    .label('Password')
    .matches(isSpace, 'Spaces are not allowed')
    .required("Password can not be empty")
    .min(6, "Please enter a password with length of 6")
  ,
  // designation: Yup.string().required("Pleaase define this"),
  joiningDate: Yup.date().required("Please Specify The Joining Date"),
  designation: Yup.string()
}
);
export const userSchema = Yup.object().shape({
  dob: Yup.date().required("Please Specify Your Date of Birth")
  ,
  contactNumber: Yup.string()
    .min(10, 'Number must have 10 digits')
    .max(10, 'Number must have 10 digits')
    .matches(isSpace, 'Spaces are not allowed')
    .matches(phoneRegExp, "Please Enter Valid Mobile Number"),
  address: Yup.string()
    .label('address')
    .required('Please enter address'),
  bankAccount: Yup.string()
    .label('bankAccount')
    .min(10, 'Please enter your Account Number')
    .max(30, 'Please enter your Account Number'),
  ifsc: Yup.string()
    .required("IFSC Code Is Required"),
  bankName: Yup.string()
    .required('Please enter your bank name')
    .label('bankName'),
  // aadharCard: Yup.object().shape()
  //   .required('upload your file'),
  // panCard: Yup.object().shape()
  //   .required('upload your file')

})







export const partnerSignup = Yup.object().shape({
  hiringFor: Yup.string()
    .min(1, 'Must have at least 1 characters'),
  companyName: Yup.string()
    .label('Company Name')
    .min(1, 'Must have at least 1 characters')
    .when('hiringFor', {
      is: (fieldTwo) => fieldTwo == "myOwnCompany",
      then: Yup.string()
        .required('Please enter company/employer name'),
    }),
  consultancyName: Yup.string()
    .label('Consultancy Name')
    .min(1, 'Must have at least 1 characters')
    .when('hiringFor', {
      is: (fieldTwo) => fieldTwo == "myClients",
      then: Yup.string()
        .required('Please enter consultancy name'),
    }),
  companyWebsite: Yup.string()
    .label('Company website')
    .min(1, 'Must have at least 1 characters')
    .when('hiringFor', {
      is: (fieldTwo) => fieldTwo == "myOwnCompany",
      then: Yup.string()
        .required('Please enter company website'),
    }),
  consultancyWebsite: Yup.string()
    .label('Consultancy website')
    .min(1, 'Must have at least 1 characters')
    .when('hiringFor', {
      is: (fieldTwo) => fieldTwo == "myClients",
      then: Yup.string()
        .required('Please enter consultancy website'),
    }),
  numbersOfEmployees: Yup.string()
    .required("Please select number of employees")
    .label('Number of employees')
    .min(1, 'Must have at least 1 characters'),
  clients: Yup.string()
    .required("Please enter your clients name")
    .label('Number of employees')
    .min(1, 'Must have at least 1 characters')
}, ["hiringFor"])


export const otpSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .min(10, 'Number must have 10 digits')
    .max(10, 'Number must have 10 digits')
    .required('Please enter a registered Number')
    .matches(isSpace, 'Spaces are not allowed')
    .matches(phoneRegExp, "Please Enter Valid Mobile Number"),
});
export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Please Enter Password')
    .matches(isSpace, 'Spaces are not allowed'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export const bookingSchema = Yup.object().shape({
  firstName: Yup.string()
    .label('First Name')
    .required()
    .min(2, 'Must have at least 2 characters')
    .matches(isAlpha, 'Only Alphabets are allowed')
    .matches(isSpace, 'Spaces are not allowed'),
  lastName: Yup.string()
    .label('Last Name')
    .required()
    .min(2, 'Must have at least 2 characters')
    .matches(isAlpha, 'Only Alphabets are allowed')
    .matches(isSpace, 'Spaces are not allowed'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email'),
  aadharCard: Yup.string()
    .label('Aadhar Card')
    .required()
    .min(12)
    .max(12),
  phone: Yup.string()
    .min(10, 'Number must have 10 digits')
    .max(10, 'Number must have 10 digits')
    .required('Please enter a registered Number')
    .matches(phoneRegExp, "Please Enter Valid Number"),
  foodDeposit: Yup.number()
    .label('Food Deposit')
    .integer()
    .positive(),
  miscDeposit: Yup.number()
    .label('Misc Deposit')
    .integer()
    .positive(),
  depositAmount: Yup.number()
    .label('Rent Deposit')
    .integer()
    .positive(),
  upiID: Yup.string()
    .label('UPI ID')
    .required()
    .matches(isUpiId, 'Enter Valid UPI ID')
    .matches(isSpace, 'Spaces are not allowed'),
  amountPaid: Yup.number()
    .label('Amount')
    .required()
    .integer()
    .moreThan(0)
});

export const changeSponsorSchema = Yup.object().shape({
  firstName: Yup.string()
    .label('First Name')
    .required()
    .min(2, 'Must have at least 2 characters'),
  lastName: Yup.string()
    .label('Last Name')
    .required()
    .min(2, 'Must have at least 2 characters'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email'),
  aadharCard: Yup.string()
    .label('Aadhar Card')
    .required()
    .min(12)
    .max(12),
  phone: Yup.string()
    .min(10, 'Number must have 10 digits')
    .max(10, 'Number must have 10 digits')
    .required('Please enter a registered Number')
    .matches(phoneRegExp, "Please Enter Valid Number"),
  upiID: Yup.string()
    .label('UPI ID')
    .required(),
});

export const personalDetailSchema = Yup.object().shape({
  firstName: Yup.string()
    .label('First Name')
    .required()
    .min(1, 'Must have at least 2 characters')
    .matches(isAlpha, 'Only Alphabets are allowed')
    .matches(isSpace, 'Spaces are not allowed'),
  lastName: Yup.string()
    .label('Last Name')
    .required()
    .min(1, 'Must have at least 2 characters')
    .matches(isAlpha, 'Only Alphabets are allowed')
    .matches(isSpace, 'Spaces are not allowed'),
  aadharNumber: Yup.string()
    .label('Aadhar Card')
    .min(12)
    .max(12)
    .matches(isSpace, 'Spaces are not allowed')
    .matches(aadharCardRegExp, 'Enter Valid Aadhar Number'),
  alternativeMobileNumber: Yup.string()
    .label('Mobile Number 2')
    .notRequired()
    .min(10, 'Number must have 10 digits')
    .max(10, 'Number must have 10 digits')
    .matches(isSpace, 'Spaces are not allowed')
    .matches(phoneRegExp, "Please Enter Valid Number"),
  workLocation: Yup.string()
    .label('Work Location'),
  nativeLocation: Yup.string()
    .label('Native Location')
    .required(),
  otherDocName: Yup.string()
    .label('Document Name'),
  dateOfBirth: Yup.string()
    .required('Select Date of Birth'),
  docFront: Yup.mixed()
    .required(),
  profilePhoto: Yup.mixed()
    .notRequired(),
  docBack: Yup.mixed()
    .notRequired()

});

export const eduSkill = Yup.object().shape({
  education: Yup.string()
    .required('Please Select Education')
    .label('Education'),
  degreeName: Yup.string()
    .label('Degree Name')
    .min(1, 'Must have at least 1 characters'),
  collegeName: Yup.string()
    .label('College Name')
    .min(1, 'Must have at least 1 characters'),
});
export const workExperience = Yup.object().shape({
  jobTitle: Yup.string()
    .label('Job Title')
    .required('Please enter job title')
    .min(1, 'Must have at least 1 characters'),
  companyName: Yup.string()
    .required("Please enter company/employer name")
    .label('Company Name')
    .min(1, 'Must have at least 1 characters'),
  salary: Yup.string()
    .label('Salary')
    .notRequired()
    .min(1, 'Must have at least 1 characters'),
  yearsOfExperience: Yup.string()
    .label('Experience')
    .required('Please select experience level')
    .min(1, 'Must have at least 1 characters'),
});


export const checkInFilterSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .min(10, 'Number must have 10 digits')
    .max(10, 'Number must have 10 digits')
    // .required('Please enter a registered Number')
    .matches(phoneRegExp, "Please Enter Valid Number")
    .when('bookingId', {
      is: (fieldTwo) => !fieldTwo || fieldTwo.length === 0,
      then: Yup.string().required("At least one of the fields is required"),
      otherwise: Yup.string()
    }),
  bookingId: Yup.string()
    .label('Booking Id')
    .min(8)
    .max(8)
    .when('mobileNumber', {
      is: (fieldTwo) => !fieldTwo || fieldTwo.length === 0,
      then: Yup.string()
        .required('At least one of the fields is required'),
    }),
}, ["mobileNumber", "bookingId"])