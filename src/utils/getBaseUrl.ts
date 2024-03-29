const getBaseURL = (): string => {
  // 根据接口文档定
  let baseURL = '/api';

  // 开发时选择接口环境
  const proxyURL = '/dev';
  // const proxyURL = '/test';
  // const proxyURL = '/prod';

  // 判定是否打包 判定本地和线上
  if (process.env.NODE_ENV !== 'production') {
    baseURL = proxyURL + baseURL;
  }
  return baseURL;
};

export default getBaseURL;
