import BCRRF from "@/assets/ipo/BCRR_Forms_Transaction_Form_2.pdf";
import BCRRS from "@/assets/ipo/BCRR_Supplemental_Form.pdf";
import BCRRTF from "@/assets/ipo/BCRR_Transaction_Form.pdf";
import Copyright from "@/assets/ipo/Copyright_Enrollment.pdf";
import Endorsement from "@/assets/ipo/ENDORSEMENT_FORM.pdf";
import Trademark from "@/assets/ipo/Trademark_Applicaiton_Form.pdf";
import IPOManual from "@/assets/ipo/IPO-OP-MANUAL.pdf";

export const ipoDocuments = [
  {
    resource_id: "ipo-1",
    title: "IPO-OP-Manual",
    subject: "Intellectual Property Rights Manual Operation",
    file_url: IPOManual,
    size: 1200000,
  },
  {
    resource_id: "ipo-2",
    title: "BCRR Form Transaction Form",
    subject: "Transaction Form",
    file_url: BCRRF,
    size: 620000,
  },
  {
    resource_id: "ipo-3",
    title: "BCRR Supplemental Form",
    subject: "Supplemental Form For Additional Author or Creator",
    file_url: BCRRS,
    size: 232000,
  },
  {
    resource_id: "ipo-4",
    title: "BCRR Transaction Form",
    subject: "Transaction Form - Supplemental Sheet",
    file_url: BCRRTF,
    size: 1600000,
  },
  {
    resource_id: "ipo-5",
    title: "Copyright Enrollment",
    subject: "Copyright Registry Enrollment Form",
    file_url: Copyright,
    size: 245760,
  },
  {
    resource_id: "ipo-6",
    title: "Endorsement Form",
    subject: "Intellectual Property Office",
    file_url: Endorsement,
    size: 325000,
  },
  {
    resource_id: "ipo-7",
    title: "Trademark Appliation Form",
    subject: "Trademark Application",
    file_url: Trademark,
    size: 273000,
  },
];
