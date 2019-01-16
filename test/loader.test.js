import webpack from './helpers/compiler';

describe('loader', () => {
  it('should works without options', async () => {
    const config = {
      loader: {
        test: /\.static$/,
        options: {},
      },
    };

    const stats = await webpack('fixture.js', config);
    const jsonStats = stats.toJson();
    const { assets } = jsonStats;

    const svgAssets = assets.filter(({ name }) => /\.svg$/.test(name))
    const txtAssets = assets.filter(({ name }) => /\.txt$/.test(name))

    expect(svgAssets.length).toBe(2)
    expect(txtAssets.length).toBe(0)

    expect(svgAssets[0].name).toBe('logos/nested/navi.svg')
  });

  it('should work with outputPath option', async () => {
    const config = {
      loader: {
        test: /\.static$/,
        options: {
          outputPath: 'assets',
        },
      },
    };

    const stats = await webpack('fixture.js', config);
    const jsonStats = stats.toJson();
    const { assets } = jsonStats;

    const svgAssets = assets.filter(({ name }) => /\.svg$/.test(name))

    expect(svgAssets[0].name).toBe('assets/logos/nested/navi.svg')
  });
});