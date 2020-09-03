import General from './data/general.json'
import GlasgowComaScore from './data/glasgow-coma-score.json'
import LifelinesQuestionnaireR4 from './data/LifelinesQuestionnaireR4.json'
import NeonateRecord from './data/neonate-record.json'
import Phq9Questionnaire from './data/phq-9-questionnaire.json'
import RealWorld from './data/real-world.json'
import SurgeonGeneral from './data/surgeon_general.json'
import UssgFht from './data/ussg-fht.json'
import ZikaVirusExposureAssessment from './data/zika-virus-exposure-assessment.json'
import { Questionnaire } from 'smartmarkers'

export enum ExampleType {
    General = 'general',
    GlasgowComaScore = 'glasgow-coma-score',
    LifelinesQuestionnaireR4 = 'LifelinesQuestionnaireR4',
    NeonateRecord = 'neonate-record',
    Phq9Questionnaire = 'phq-9-questionnaire',
    RealWorld = 'real-world',
    SurgeonGeneral = 'surgeon_general',
    UssgFht = 'ussg-fht',
    ZikaVirusExposureAssessment = 'zika-virus-exposure-assessment',
}

export const ExampleMap = {
    [ExampleType.General]: (General as any) as Questionnaire,
    [ExampleType.GlasgowComaScore]: (GlasgowComaScore as any) as Questionnaire,
    [ExampleType.LifelinesQuestionnaireR4]: (LifelinesQuestionnaireR4 as any) as Questionnaire,
    [ExampleType.NeonateRecord]: (NeonateRecord as any) as Questionnaire,
    [ExampleType.Phq9Questionnaire]: (Phq9Questionnaire as any) as Questionnaire,
    [ExampleType.RealWorld]: (RealWorld as any) as Questionnaire,
    [ExampleType.SurgeonGeneral]: (SurgeonGeneral as any) as Questionnaire,
    [ExampleType.UssgFht]: (UssgFht as any) as Questionnaire,
    [ExampleType.ZikaVirusExposureAssessment]: (ZikaVirusExposureAssessment as any) as Questionnaire,
}
