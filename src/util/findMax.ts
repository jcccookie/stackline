export default function findMax({ 
  data, types
}: { data: any[], types: string[] }) {
  let max = data[0].data[0].y;

  types.forEach(type => {
    data.forEach(item => {
      // @ts-ignore
      item.data.forEach(dataPoint => {
        if (item.id === type) {
          if (dataPoint.y > max) {
            max = dataPoint.y;
          }
        }
      });
    });
  })

  return { max };
};