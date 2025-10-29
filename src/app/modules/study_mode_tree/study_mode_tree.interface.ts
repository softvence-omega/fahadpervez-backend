export type T_ContentManagementAdmin = {
  subjectName:string;
  systems:{
    name:string;
    topics:{
      topicName:string;
      subTopics:{
        subtopicName:string;
      }[],
    }[],
  }[],
} 
