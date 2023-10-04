export async function _post(request:any) {
    const { username } = JSON.parse(request.body);
  
  
    return {
      status: 200,
    };
}