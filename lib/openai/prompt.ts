// prompt.ts

export interface TripDetails {
  departureDate: string;
  returnDate: string;
  startingPoint: string;
  destinationPoint: string;
  travelType: 'Solo' | 'Couple' | 'Group';
  awayFromMassTourism: boolean;
  activities?: string;
  preferredStopoverLocations?: string;
}

export const getPrompt = ({
  departureDate,
  returnDate,
  startingPoint,
  destinationPoint,
  travelType,
  awayFromMassTourism,
  activities,
  preferredStopoverLocations,
}: TripDetails): string => {
  const travelTypeDescription =
    travelType === 'Solo'
      ? '独自一人'
      : travelType === 'Couple'
        ? '情侣'
        : '团体';
  const massTourismNote = awayFromMassTourism
    ? '- 对我来说，避免大众旅游景点非常重要，不希望走在充满游客的路径上。'
    : '';
  const activitiesNote = activities
    ? `我希望进行的活动包括：${activities}。`
    : '';
  const stopoverLocationsNote = preferredStopoverLocations
    ? `我首选的中途停留地点包括：${preferredStopoverLocations}。`
    : '';

  return `
      忽略之前的所有信息。我想计划一次${travelTypeDescription}的旅行。你需要生成一个我未来旅行的介绍。请按以下结构组织这个介绍：
  
      - 简短的介绍
      - 包含旅行所需的所有有用和后勤信息的表格（货币、安全、首都、宗教、语言等）。以HTML格式呈现此表格
      - 根据我给出的旅行时长，详细列出从出发地到目的地的旅行安排。请详细列出每个阶段的地点名称、如何到达那里、可以进行的活动。每个阶段均应包含坐标（纬度，经度），坐标之间用双感叹号隔开。例如：!!48.1469, 11.2659!! 你可以根据需要安排每个城市/国家的停留时间。
      - 包含建议和可能的后续行程的结论。
  
      请记住：
  
      ${massTourismNote}
      - 旅行即是旅程。我不想在同一个地方或目的地停留超过几周。我想四处旅行。
      - 旅行也必须安全。不要带我去安全无法保证的地方。
  
      我愿意乘坐公交车、火车、汽车、面包车、自行车或飞机旅行。
  
      我的旅行日期是从${departureDate}到${returnDate}。
  
      我将从${startingPoint}出发，到达${destinationPoint}。
  
      ${activitiesNote}
  
      ${stopoverLocationsNote}
    `;
};
