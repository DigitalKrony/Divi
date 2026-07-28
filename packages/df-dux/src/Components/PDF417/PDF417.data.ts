/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export const ElementIDs = [
  {
    id: "DCA",
    name: "Jurisdiction-Specific Vehicle Class",
    description:
      "The type of vehicle the customer is licensed to drive (e.g., A, B, C, D).",
  },
  {
    id: "DCB",
    name: "Jurisdiction-Specific Restrictions Code",
    description:
      "Codes indicating restrictions on driving privileges (e.g., corrective lenses).",
  },
  {
    id: "DCD",
    name: "Jurisdiction-Specific Endorsement Code",
    description:
      "Codes indicating endorsements on driving privileges (e.g., motorcycle, school bus).",
  },
  {
    id: "DBA",
    name: "Document Expiration Date",
    description:
      "The date the driving or identification privilege expires (MMDDCCYY format).",
  },
  {
    id: "DCS",
    name: "Customer Family/Last Name",
    description: "The customer's family or last name or primary surname.",
  },
  {
    id: "DAC",
    name: "Customer First Name",
    description: "The customer's first name.",
  },
  {
    id: "DAD",
    name: "Customer Middle Name(s)",
    description: "The customer's middle name(s) or initial(s).",
  },
  {
    id: "DCT",
    name: "Customer First and Middle name(s)",
    description: "The customer's rist and middle name(s) or initial(s).",
  },
  {
    id: "DBD",
    name: "Document Issue Date",
    description: "The date the document was issued (MMDDCCYY format).",
  },
  {
    id: "DBB",
    name: "Date of Birth",
    description:
      "The customer's date of birth (MMDDCCYY format in most versions).",
  },
  {
    id: "DBC",
    name: "Sex",
    description:
      "The customer's gender (1=Male, 2=Female, 9=Not Specified/Other).",
  },
  {
    id: "DAY",
    name: "Eye Color",
    description:
      "The customer's eye color (coded, e.g., BRO for Brown, BLU for Blue).",
  },
  {
    id: "DAU",
    name: "Height",
    description:
      "The customer's height (in inches or centimeters, depending on state/version).",
  },
  {
    id: "DAG",
    name: "Address - Street 1",
    description: "The customer's primary street address line.",
  },
  {
    id: "DAI",
    name: "Address - City",
    description: "The city of the customer's address.",
  },
  {
    id: "DAJ",
    name: "Address - Jurisdiction Code",
    description:
      "The state or province of the customer's address (2-letter code).",
  },
  {
    id: "DAK",
    name: "Address - Postal Code",
    description: "The customer's ZIP or postal code.",
  },
  {
    id: "DAQ",
    name: "Customer ID Number",
    description:
      "The unique identifying number of the customer/cardholder (Driver's License or ID Card number).",
  },
  {
    id: "DCG",
    name: "Country Identification",
    description: "The country that issued the document (e.g., USA, CAN).",
  },
  {
    id: "DDE",
    name: "Name Suffix / Last Name Truncation",
    description:
      "The suffix for the name (e.g., JR, SR, III). Indicator that the last name is truncated.",
  },
  {
    id: "DDF",
    name: "First Name Prefix / First Name Truncation",
    description:
      "The prefix for the name (e.g., DR, ESQ, HON). Indicator that the first name is truncated.",
  },
  {
    id: "DDG",
    name: "Alias/AKA Family Name / Middle Name Truncation",
    description:
      "Alternative or 'Also Known As' last name. Indicator that the middle name(s) are truncated.",
  },
  {
    id: "DAH",
    name: "Address - Street 2",
    description: "Secondary street address line (e.g., apartment number).",
  },
  {
    id: "DAZ",
    name: "Hair color",
    description:
      "Bald, black, blonde, brown, gray, red/auburn, sandy, white, unknown. three-character abbreviations for some jurisdictions",
  },
  {
    id: "DCI",
    name: " Place of Birth",
    description: "Country and municipality and/or state/province",
  },
  {
    id: "DCJ",
    name: "Audit information",
    description:
      "A string of letters and/or numbers that identifies when, where, and by whom a driver license/ID card was made. ",
  },
  {
    id: "DCK",
    name: "Audit Information/Composite Key",
    description:
      "A field containing a composite of critical data elements (like DL number, DOB, Exp. Date) used for data integrity and auditing. Its content is defined by the issuing jurisdiction.",
  },
  {
    id: "DBN",
    name: undefined,
    description: "Placeholder for future Data Element.",
  },
  {
    id: "DBG",
    name: undefined,
    description: "Placeholder for future Data Element.",
  },
  {
    id: "DBS",
    name: undefined,
    description: "Placeholder for future Data Element.",
  },
  {
    id: "DCU",
    name: "Name Suffix",
    description: "Name Suffix (JR, SR, 1ST, ect.)",
  },
  {
    id: "DCE",
    name: "Physical Description - Weight Range",
    dedscription:
      "Indicates the approximate weight range of the cardholder ( 0 - 9 ).",
  },
  {
    id: "DCL",
    name: undefined,
    description: "Placeholder for future Data Element.",
  },
  {
    id: "DCM",
    name: "Standard vehicle classification",
    description:
      "Standard vehicle classification code(s) for cardholder. This data element is a placeholder for future efforts to standardize vehicle classifications",
  },
  {
    id: "",
    name: "",
    description: "",
  },
  {
    id: "DCN",
    name: "Standard endorsement code",
    description: "Standard endorsement code(s) for cardholder.",
  },
  {
    id: "DCO",
    name: "Standard restriction code",
    description: "Standard restriction code(s) for cardholder.",
  },
  {
    id: "DCP",
    name: "Jurisdiction-specific vehicle classification description",
    description:
      "Text that explains the jurisdiction-specific code(s) for classifications of vehicles cardholder is authorized to drive.",
  },
  {
    id: "DCQ",
    name: "Jurisdiction-specific endorsement code description",
    description:
      "Text that explains the jurisdiction-specific code(s) that indicates additional driving privileges granted to the cardholder beyond the vehicle class.",
  },
  {
    id: "DCR",
    name: "Jurisdiction-specific restriction code description",
    description:
      "Text describing the jurisdiction-specific restriction code(s) that curtail driving privileges.",
  },
  {
    id: "DDA",
    name: "Compliance Type",
    description:
      "Indicator for REAL ID compliance (e.g., F for Compliant, N for Non-compliant).",
  },
  {
    id: "DDB",
    name: "Issue Time",
    description: "Optional field, often part of jurisdiction-specific data",
  },
  {
    id: "DDC",
    name: undefined,
    description: "Placeholder for future data element.",
  },
  {
    id: "DDD",
    name: "Limited Duration Document Indicator",
    description:
      'DHS required field that indicates that the cardholder has temporary lawful status. Absent or "1" for Temporary Lawful status.',
  },
  {
    id: "DAW",
    name: "Weight (pounds)",
    description: "Cardholder weight in pounds",
  },
  {
    id: "DAX",
    name: "Weight (kilograms)",
    description: "Cardholder weight in kilograms",
  },
  {
    id: "DDH",
    name: "Under 18 Until",
    description: "Date on which the cardholder turns 18 years old.",
  },
  {
    id: "DDI",
    name: "Under 19 Until",
    description: "Date on which the cardholder turns 19 years old.",
  },
  {
    id: "DDJ",
    name: "Under 21 Until",
    description: "Date on which the cardholder turns 21 years old.",
  },
  {
    id: "DDK",
    name: "Organ Donor Indicator",
    description:
      "Field that indicates that the cardholder is marked as an organ donor in the system of record.",
  },
  {
    id: "DBH",
    name: "Organ Donor Indicator",
    description: "Indicates if the cardholder is an organ donor.",
  },
  {
    id: "DDL",
    name: "Veteran Indicator",
    description:
      'Field that indicates that the cardholder is marked as a Veteran in the system of record15. This field is either absent or has the following value:Veteran = "1"',
  },
  {
    id: "DBJ",
    name: "Veteran Indicator",
    description: "Indicates if the cardholder is a veteran.",
  },
  {
    id: "DDM",
    name: "CDL Indicator",
    description:
      "FMCSA required field that denotes whether the credential is a Commercial Driver’s License(CDL) / Commercial Learner’s Permit(CLP).",
  },
  {
    id: "DDN",
    name: "Non-Domiciled Indicator",
    description:
      "FMCSA required field that denotes whether the CDL/CLP holder is “Non-Domiciled”. This field can only be present if the CDL Indicator is present.",
  },
  {
    id: "DDO",
    name: "Enhanced Credential Indicator",
    description:
      "Field that indicates that the credential is an Enhanced Credential (Enhanced Driver License / Enhanced Identification Card). ",
  },
  {
    id: "DDP",
    name: "Permit Indicator",
    description:
      "Field that indicates the credential is a permit. (e.g. Original License Permit, Motorcycle Permit, Commercial Permit, etc.).",
  },
  {
    id: "DCF",
    name: "Document Discriminator",
    description:
      "A unique number assigned to a specific physical card (changes upon renewal/replacement).",
  },
  {
    id: "DZZ",
    name: "Jurisdiction-Specific Reserved Data",
    description:
      "Placeholder for data defined by the specific state/province (custom fields often starting with 'Z').",
  },
  {
    id: "ZMZ",
    name: "MI Custom Data Element",
    description:
      "A specific, proprietary data element used by Michigan (MI). The meaning of the code 'ZMZ' and its value are defined by the MDOS, often relating to card type or internal tracking.",
  },
];
