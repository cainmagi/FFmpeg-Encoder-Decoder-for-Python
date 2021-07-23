# Contributing to mpegCoder

Thank you for your interest in contributing to `mpegCoder`! We are accepting pull
requests in any time.

As a reminder, all contributors are expected to follow our [Code of Conduct][coc].

[coc]: https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/blob/master/CODE_OF_CONDUCT.md

## Contributing to the package

### Installation

Please [fork] this project as your own repository, and create a sub-branch based on any branch in this project. The new branch name could be a short description of the implemented new feature.

After that, clone your repository by

```shell
git clone -b <your-branch-name> --single-branch https://github.com/<your-name>/FFmpeg-Encoder-Decoder-for-Python.git mpegCoder
```

In some cases, you may need to install some dependencies. Please follow the specific instructions for compling `mpegCoder`.

### Debugging

We have not provided any testing scripts now. I am glad to accept the help from anyone who is willing to writing the testing scripts for this project.

### Sending pull requests

After you finish your works, please send a new request, and compare your branch with the target branch in `mpegCoder`. You could explain your works concisely in the pull request description. You are not required to add the updating reports in the repository, or add the documentation. I could take over these works based on your description.

## Contributing to docs

If you want to contribute to docs, please fork the [`docs`](https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/docs) branch, and clone it

```shell
git clone -b docs --single-branch https://github.com/<your-name>/FFmpeg-Encoder-Decoder-for-Python.git mpegCoder-docs
```

You need to install `nodejs` and `yarn` first. We suggest to create an isolated conda environment:

```shell
conda create -n docs -c conda-forge git python=3.9 nodejs=15.14.0 yarn=1.22.10
```

Then you could initialize the docs project by

```shell
cd mpegCoder-docs
yarn install
```

You could start the local debugging by

```shell
yarn start
```

After you finish your works, you could also send a pull request.
