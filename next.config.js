
module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/pokemon',
          permanent: true,
        },
      ];
    },
  };
  