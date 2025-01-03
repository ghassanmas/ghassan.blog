---
title: A brief history of the Open edX platform.
description: exploring history of Open edX mainly the git history of edx-platform repo
img: https://ghassan.blog/img/openedx-repos.png
date: 2022-05-28
tags:
  - open-source
layout: layouts/post.njk
pinned: true
---

**Last Updated:** 18 June 2022

What is Open edX, Open edX is an E-learning platform, its what powers edx.org, it was built 2012 [^1].
[^1]: May be before that, but that at least the earlist [commit](https://github.com/openedx/edx-platform/commit/cc1de22e2621c7fa1199750cf13ba57c937b9d98) you could go back in history with 



I have been recently involved in contributing to the Open edX project. 

In literature we have been told learning about history is important in order to understand the present and better predict the future. And I do think that also applies to a continuously evolving open source project like the Open edX. 

Add to that while I have been going over the project, to learn more a particular concept or to disambiguate an obscurity. I would mostly end up with some _historically we_...etc.


So let's go through that history. First I will go over the numbers, of the repos inside [/openedx](https://github.com/openedx) org at github, with an overview of the project in general.
Secondly I will dig into edx-platform repo in particular, in the eyes of git, using mainly `git diff` and `git log`, I do an overall summary for each year, from 2011 to 2022. 


> ==Note==: Open edX is a continuously evolving project, thus it's important when going over this overview or any simliar doc to take the last edited time into considration. Which is 19th of May 2022 in this case.


## Repos 

Code lives in repos, there are a total of 189 repos as of the time of writing. I have made a little script to visualuse how repos count increased over time. 
![Open edX repos count with time](/img/openedx-repos.png "Open edX repos count with time")
<details><summary>Source</summary>

```python
import json
import re
from datetime import datetime
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
# Reading json file of total repos The file was created by github API
# This file was created by making two GET API request and combine the result
# GET https://api.github.com/users/openedx/repos?page=1&per_page=100
# GET https://api.github.com/users/openedx/repos?page=2&per_page=100
f = open('openedx-repos.json','r')
repos_json = json.load(f)

# Making a panda dataframe
df = pd.DataFrame(repos_json) 
df['created_at'] = pd.to_datetime(df['created_at']).dt.date
df['updated_at'] = pd.to_datetime(df['updated_at']).dt.date
df['pushed_at'] = pd.to_datetime(df['pushed_at']).dt.date
df['is_mfe'] = False
df['is_mfe'] = np.where(df['name'].str.contains('frontend-app'),True, df['is_mfe'])
df['is_xblock'] = False
df['is_xblock'] = np.where(df['name'].str.contains('xblock'),True, df['is_xblock'])
df['is_xblock'] = np.where(df['name'].str.contains('XBlock'),True, df['is_xblock'])
df['is_enterprise'] = False
df['is_enterprise'] = np.where(df['name'].str.contains('enterprise'),True, df['is_enterprise'])

#Preparing data to plot
years = [str(i) for i in range(2013,2024)]
years_count_all = {}
for year in years:
  years_count_all[year] = df[df['created_at'] < pd.Timestamp(int(year), 1, 1).date()].count()[0]
years_count_mfe = {}
for year in years:
  years_count_mfe[year] = df[(df['created_at'] < pd.Timestamp(int(year), 1, 1).date()) & (df['is_mfe'])].count()[0]
years_count_xblock = {}
for year in years:
  years_count_xblock[year] = df[(df['created_at'] < pd.Timestamp(int(year), 1, 1).date()) & (df['is_xblock'])].count()[0]
years_count_enterprise = {}
for year in years:
  years_count_enterprise[year] = df[(df['created_at'] < pd.Timestamp(int(year), 1, 1).date()) & (df['is_enterprise'])].count()[0]

# Plotting
plt.figure(figsize=(8, 5))
plt.plot(years, list(years_count_all.values()), label = f"All repos totals={years_count_all['2023']}")
plt.plot(years, list(years_count_mfe.values()), label = f"MFEs totals={years_count_mfe['2023']}")
plt.plot(years, list(years_count_xblock.values()), label = f"Xblocks totals={years_count_xblock['2023']}")
plt.plot(years, list(years_count_enterprise.values()), label = f"Enterprise totals={years_count_enterprise['2023']}")
plt.title('Open edX repos total counts by time')
plt.xlabel('Year')
plt.ylabel('Repos count')
plt.yticks(np.arange(0, 189, 10))
print(plt.xticks)
labels = years[:-1]
labels.append('2022-05')
plt.xticks(years,labels)
plt.legend()
plt.savefig('openedx-repos.png')

```
</details>

I have also grouped/categorized some repos by  repo type, more on that later. 

As you can see from the graph the number of repos is continusesly increasing, it's important to note though that, a new repo doesn't mean a new feateur. May be it was decoupling a piece of code from the main repo edx-platform.


#### XBlocks:

Are repo dedicated to extend the functionality, of the learning experience, both in studio and LMS. With XBlock you can create a new type of problem, add new feature, e.g. let learner mark that they have complemented a unit.

XBlocks are essentially a Django based app, which can be installed to extend functionality of the platform mainly in the learning experience.

As you can conclude from the graph XBlock is may be when of the earlist feature available for the project, and though the total count is 22. There must be way more than 22 XBlocks. 22 is number of XBlock repos that are in /openedx org, i.e. they are theofficially available XBlocks.

### MFEs:

Are Repo which are based on the a modern micro frontend framework. They are  React based, with paragon as a design system.

Each MFE is responsbile for a specif user-centric UI, for example there is an MFE for the account, profile, learning and gradebook...etc. 

As you can see from graph, MFEs are relativity new, there were built in order to decouple server from UI rednerding. Without MFE  _almost_ for each UI changes the client would send a request to the server and then server render a template then respond to client. 

However with MFE instead the communication between client and server is based on JSON RESTful API. Communicating with JSON instead is way **computationally** cheaper, than responding with a rendered response. 

On other side this approach in my opinion brough two main challenge: 

- For years the community around Open edX used to change UI by customzing themes, however with this new change, an Open edX developer is required to learn React, which add a new concept. 
- The transition period: while MFEs are being adopted, this means that platform is kinda in a hyprid state. Where both server templeting and MFEs are being used and each require different workflow to customize.

While the second challenge is temproray, the first one is ongoing. 
However the community is aware of that and some work is already being devoted to solve those main issue.

### Enterpies

I don't have much knowledge around these kind of repos. My speculation seems that edx.org high class clients. the way I would put it, is that I think a consdirable amount of effort is being put into it from edx.org.

## edx-platform aka The Monolith

There are total of 60K commits, lets get other random

### An overview of Commiters: 

`git shortlog -sn --no-merges >> commiters.txt`[^2]

Lets get top 10 most commiters `head commiters.txt`
```
  2218  Calen Pennington
   922  cahrens
   901  Vik Paruchuri
   886  Brian Talbot
   854  Ned Batchelder
   805  Chris Dodge
   758  David Baumgold
   734  Diana Huang
   705  David Ormsbee
   639  Will Daly
```
[^2]: From a question on [stackoverflow](https://stackoverflow.com/questions/1828874/generating-statistics-from-git-repository)  

For total number of commiters: `wc -l commiters.txt` **871**

Total commits by all `git rev-list --no-merges --count HEAD` **40659**

 I think to be more accurate and fair and get picture of the project, lets check the distribution of commits, I split the commiters into 3 sets, first commiters, who did at least 100 commits of their total commits, second who did between 10 to 100, and third who did between 1 to 10 commits.

Here are the result: 

```python
A total of 93 commiters  (whom are 10.677% of total commiters) did 29280 commits (which are 72.012% of total commits)
A total of 252 commiters (whom are 28.932% of total commiters) did 9707  commits (which are 23.874% of total commits)
A total of 528 commiters (whom are 60.620% of total commiters) did 1673  commits (which are 4.115%  of total commits)
```

![edx-platform commits distribution](/img/edx-platform-commits.png "edx-platform commits distribution")

I am not really satisfied with that, given only 10% commiters did 70% of commits.
This will tell us why the project is heavily influenced by edx.org, I bet most of commiters in top group are affiliated with edx.org. 

#### Update:

_Start of update_

When I shared this blog with the Open edX community, I recevied a note from one of long time contributor [David Ormsbee](https://github.com/ormsbee):

> But if you’re treating all commits as equal and want to measure who is doing what in the code, you might want to limit the time range to after 2015 or so
> -- <cite> David Rmsbee @ https://discuss.openedx.org/t/blog-a-brief-history-of-the-open-edx/7358/2 <cite>

So following David, advice I have recreated the bar graph starting from 2016 and the result was different as he has expected.

![edx-platform commits distribution from 2016](/img/commits_from_2016.png "edx-platform commits distribution from 2016")

As you can note, in the second graph the distrubution of commits between the first two group are almost equal. This according to David has to do with the change of the  commit policy, since initally commiters didn't squash their commits. Add to that also initally edX used the main project repo for marketing site content. Which would defeinily have a larger share of commits. You could refer to the cite link above for more context.

_End of update_

But lets the see how these bars came out to be this way overtime, i.e. how did come up with that from 2012 to now. 
Recall for generating the `git shortlog -sn --no-merges >> commiters.txt`, lets repeat that but with adding a filter for date, e.g for to get all commiters by 2012:

```bash
git shortlog -sn --no-merges --until 01.01.2012 > commiters_12.txt` for 2013 `git shortlog -sn --no-merges --until 01.01.2013 > commiters_13.txt`. 
```
and so one, I did that from 2012 to 2022. 


| Year | Total Commits |Total commiters | > 100 commits | between 10 to 100 | between 1 to 9|
| ------- | --- |------|---|---|----|
| 2012| 99| 1^[First Committer Piotr Mitros http://mitros.org/p/#bio] | 1| 0| 0|
| 2013| ~6K|64|18|17|29|
| 2014| ~19K |155|36|42|76|
| 2015| ~23K |357|54|108|194|
| 2017| ~26K |444|59|134|250|
| 2018| ~29K |514|63|162|288|
| 2019| ~31K |577|72|175|329|
| 2020| ~34K |668|78|199|390|
| 2021| ~37K |776|86|236|443|
| 2022| ~39K |836|90|252|493|
| 2022-04| ~40K |839|90|252|496|

<details><summary>Source</summary>
To create the files

```bash
years=(11 12 13 14 15 16 17 18 19 20 21 22)
for year in "${years[@]}"
do
git shortlog -sn --no-merges --from 1.1.20"$year" --until 1.1.20"$(( $year + 1 ))" > committers_"$year".txt
done

```

```bash
for year in "${years[@]}"
do
echo ---For Year 20$year----
echo Total commiters $(wc -l commiters_"$year".txt)
echo Total Commits "$(awk '{sum+=$1} END{print sum;}' commiters_"$year".txt)"
echo Commiters with more than 100 commits $(grep -E '\s[0-9]{3}\s' commiters_"$year".txt | wc -l)
echo Commiters with between than 100 commits $(grep -E '\s[0-9]{2}\s' commiters_"$year".txt | wc -l)
echo Commiters with at least 10 commits $(grep -E '\s[0-9]{1}\s' commiters_"$year".txt | wc -l)
done
```

```bash
for year in "${years[@]}"
total_commiters=$(wc -l commiters_"$year".txt)
total_commits=$(awk '{sum+=$1} END{print sum;}' commiters_"$year".txt)
commiters_more_100=$(grep -E '\s[0-9]{3}\s' commiters_"$year".txt | wc -l)
commits_more_100=$(grep -E '\s[0-9]{3}\s' commiters_"$year".txt } | awk '{sum+=$1;} END{print sum;}')
commiters_between_100_10=$(grep -E '\s[0-9]{2}\s' commiters_"$year".txt | wc -l)
commits_between_10_100= $(grep -E '\s[0-9]{2}\s' commiters_"$year".txt } | awk '{sum+=$1;} END{print sum;}')
commiters_at_least_9=$(grep -E '\s[0-9]{1}\s' commiters_"$year".txt | wc -l)
commits_at_least_9=$(grep -E '\s[0-9]{1}\s' commiters_"$year".txt } | awk '{sum+=$1;} END{print sum;}')

echo "| "$year" | \
$total_commiters | \ #Total Commiters
$total_commits | \ #Total Commits
$more_than_

"

```
</details>

### Commits per year


```python
Year: 2021, commits: 3813
Year: 2020, commits: 4086
Year: 2019, commits: 4587
Year: 2018, commits: 3727
Year: 2017, commits: 4697
Year: 2016, commits: 5172
Year: 2015, commits: 6961
Year: 2014, commits: 7470
Year: 2013, commits: 11807
Year: 2012, commits: 8248
Year: 2011, commits: 100
```

<details><summary>Source</summary>

```bash
git log --pretty='format:%cd' --date=format:'%Y' | uniq -c | awk '{print "Year: "$2", commits: "$1}'
```
[^4]
[^4]: Credit goes to [smmuf](https://gist.github.com/smuuf/0d5746c4e734c51fe0de3559d02cb852) for the command.

</details>

I don't there is much to say

### edx-platform a yearly analysis 
We will explore the changes on the edx-platform repo, year by year. Like what was added, deleted, modified. 


### 2011 

#### Quick Stats

**188** Files were changed
🟥🟥🟥🟥🟥🟥🟥   72%   Deletion
🟩🟩🟩          27%   Addition
⬜             0.5%  Renamed/Moved
               0.0%  Modifed
```python
 188 files changed, 2050 insertions(+), 53109 deletions(-)
   5.8% courseware/static/Kirchhoff_files/
   7.4% courseware/static/css/cupertino/images/
   5.8% courseware/static/css/images/css/
   7.4% courseware/static/css/ui-lightness/images/
  13.3% courseware/static/js/fancybox/
  12.8% courseware/static/subs/
   8.5% courseware/static/
   4.2% courseware/
   8.5% registration/
```

<details><summary>Source</summary>

```bash
git diff cc1de22e2621c7fa1199750cf13ba57c937b9d98 548d0491c3cfc8de55794243a36e86fc66aecce9 --shortstat --dirstat=files
```
</details>

#### Change summary

Comparing **from** [#cc1de22e](https://github.com/openedx/edx-platform/tree/cc1de22e) **to** [#548d0491](https://github.com/openedx/edx-platform/tree/548d0491) **diff**: [2011 to 2012 ](https://github.com/openedx/edx-platform/compare/cc1de22e2621c7fa1199750cf13ba57c937b9d98..548d0491c3cfc8de55794243a36e86fc66aecce9).

Not much for 2011, just one contributor[^3], no thing serious so far. Also note that the date of the first commit which is aviable to public is Dec, 7, 2011. So there was not much time to do until new year holiday I guess.

I think the main work was about removing hard coded data (_hence 70% of the change are deletion_), like staff images, course content. There was even a directory called **Kirchhoff_files**!. 

 You can see for example the image of Anant Agarwal Who I think played a critical role in the development of the project. I think he was a CEO of edx.org until they were bough by U2.],Gerald Jay Sussman, and also the first.


Beside deletion main focus was authtencation, registartion. One can assume that thinking was _we want to move this from being an internal project at MIT to something general that other organization can benfit from_.


**Period Legacy**:
- It was a Django based app and still is!.
- [Xmodule](https://github.com/openedx/edx-platform/blob/cc1de22e2621c7fa1199750cf13ba57c937b9d98/courseware/x_module.py) 


### 2012


#### Quick Stats

**3265** Files were changed

98% Addition 🟩🟩🟩🟩🟩🟩🟩🟩🟩  
1%  Deletion 🟥              
0.5%  Renamed/Moved ⬜              
    0.0%  Modifed

```python
 3265 files changed, 288463 insertions(+), 1803 deletions(-)
   4.1% cms/static/
   3.1% common/djangoapps/
   4.1% common/lib/xmodule/xmodule/
   4.3% common/static/js/vendor/mathjax-MathJax-c9db6ac/docs/html/
   4.3% common/static/js/vendor/mathjax-MathJax-c9db6ac/jax/output/HTML-CSS/fonts/STIX/General/
   4.3% common/static/js/vendor/mathjax-MathJax-c9db6ac/jax/output/HTML-CSS/fonts/
   3.2% common/static/js/vendor/mathjax-MathJax-c9db6ac/jax/output/SVG/
   4.3% common/static/js/vendor/mathjax-MathJax-c9db6ac/unpacked/jax/output/HTML-CSS/fonts/STIX/General/
   4.3% common/static/js/vendor/mathjax-MathJax-c9db6ac/unpacked/jax/output/HTML-CSS/fonts/
   3.2% common/static/js/vendor/mathjax-MathJax-c9db6ac/unpacked/jax/output/SVG/
   3.6% common/static/js/vendor/mathjax-MathJax-c9db6ac/unpacked/
   9.1% common/static/js/vendor/mathjax-MathJax-c9db6ac/
   7.6% common/static/
   4.2% common/test/data/
   4.9% lms/djangoapps/
   3.5% lms/static/admin/
   6.3% lms/static/images/
   5.6% lms/static/
   5.5% lms/templates/
   ```
<details><summary>Source</summary>

```bash
git diff 548d0491c3cfc8de55794243a36e86fc66aecce9 fa75245e8a6f2358d24398c79eeb7327ee6668a0 --shortstat --dirstat=files
```
</details>

#### Summary: 

Comparing **from** [#548d0491](https://github.com/openedx/edx-platform/tree/548d0491) **to** [#fa75245e](https://github.com/openedx/edx-platform/tree/fa75245e) **diff**: [2012 to 2013 ](https://github.com/openedx/edx-platform/compare/548d0491c3cfc8de55794243a36e86fc66aecce9..fa75245e8a6f2358d24398c79eeb7327ee6668a0).

- The project structure is split into 3 main directory, lms, cms, and common each with its djangoapps directory.
  - lms has +7 djangoapps: certificate,courseswiki,courseware django_comment_client,simple wiki,psychometrics,licenses, circuits.
  - cms has 3 djangoapps: auth,contentstore, models
  - common has 5 djangoapps: 
- Mako is being used to render template, which is still true until today. Unless it get replaced with a MFE.
- Most of the focus for frontend is being focused with MathJax
  - Makes sense because the first most famous course was about electric circuit, of which there is heavy usage of math notation. Fun note: _I almost fail that class when I was uni, may be that wouldn't have been the case if platform exist at the time_. 
- SASS styling is being used, SASS is still the main CSS framework in use even in the MFEs
- Git is being used as SVM, hence the `.gitignore` file is added
- xmodule is moved to common/lib/xmodule still holds true to today.
- The comments or the forum service was a django app.
- There was a quite huge focus on testings still holds true to today.
- edx.org was firs mentioned, stuff are being renamed from **mitx** to **edx**




### 2013

#### Quick Stats

**3878** Files were changed
🟩🟩🟩🟩🟩🟩🟩🟩🟩   72%   Addition
🟨🟨               15%  Modifed
🟥                 9%  Deletion
⬜                 2%  Renamed/Moved

3878 files are changed of which 72% are addition, 15% are modified, 9% are deletion, and 2% moved/renamed.


```python
 3878 files changed, 410249 insertions(+), 55546 deletions(-)
   3.1% cms/djangoapps/
   5.7% cms/static/
   3.3% cms/
   4.7% common/djangoapps/
   3.2% common/lib/xmodule/xmodule/js/
   4.9% common/lib/xmodule/xmodule/
   3.4% common/static/js/capa/
   4.9% common/static/js/vendor/tiny_mce/plugins/
   4.8% common/static/js/vendor/
   6.0% common/static/
   6.8% common/test/data/
   3.8% common/
  12.5% docs/course_authors/source/Images/
  10.0% lms/djangoapps/
   8.3% lms/static/
   6.5% lms/templates/
```
<details><summary>Source</summary>

```bash
git diff fa75245e8a6f2358d24398c79eeb7327ee6668a0 39380f2d2226f0d89fa9d2a5f2fc53aa4047522f --shortstat --dirstat=files
```
</details>

#### Summary: 

Comparing **from** [#fa75245e](https://github.com/openedx/edx-platform/tree/fa75245e) **to** [#39380f2d](https://github.com/openedx/edx-platform/tree/39380f2d) **diff**: [2013 to 2014 ](https://github.com/openedx/edx-platform/compare/fa75245e..39380f2d)


- LMS
 - New apps: bulk_email, 
- Huge documentation is added
- First mention of i18n in commits, i.e. the platform to support multi langues.
- xblock is beingmentioned a lot, and may be it was first mentioned around this time.
- Themeing may be is added around this time.


### 2014

Comparing **from** [#39380f2d](https://github.com/openedx/edx-platform/tree/fa75245e) **to** [#877e231c](https://github.com/openedx/edx-platform/tree/877e231c) **diff**: [2014 to 2015 ](https://github.com/openedx/edx-platform/compare/39380f2d...877e231c)

#### Quick Stats


 ```python
-----Stat for the 2014 Total Changes is  5549-----
Added:    count: 2625 percentage: %47.31
Deleted:  count: 1493 percentage: %26.91
Modified: count: 1294 percentage: %23.32
Renamed:  count: 137  percentage: %2.47
```

```python
 5549 files changed, 2663051 insertions(+), 185937 deletions(-)
   3.0% cms/static/js/
   3.3% cms/static/
   3.0% cms/templates/
   3.4% cms/
   5.0% common/djangoapps/
   6.0% common/lib/xmodule/xmodule/
   3.0% common/static/css/vendor/pdfjs/cmaps/
   3.4% common/static/js/vendor/tiny_mce/plugins/
   3.0% common/static/js/vendor/tinymce/js/tinymce/
   4.1% common/static/js/vendor/
   5.4% common/static/
   3.3% common/test/data/manual-testing-complete/
   5.5% common/test/
   5.8% conf/locale/
   8.7% docs/course_authors/source/Images/
   3.9% docs/
   7.9% lms/djangoapps/
   4.6% lms/static/images/
   6.2% lms/static/
   5.2% lms/templates/
```
<details><summary>Source</summary>

```bash
git diff 39380f2d2226f0d89fa9d2a5f2fc53aa4047522f 877e231c7ad14e2b3ff4accfca5711d81b2bd817 --shortstat --dirstat=files

```
</details>


#### Summary

From 2014, Open edX started to support mobile native app, some effort is dedicated into refactoring hence 26% of the changes are deleted 

More adoption to XBlock, for example the `circuit` is being removed from `lms/djangoapps/` since it can be replaced with a XBlock. 

New directory `/openedx/` is added

### 2015

Comparing **from** [#877e231c](https://github.com/openedx/edx-platform/tree/877e231c) **to** [#4694b0a6](https://github.com/openedx/edx-platform/tree/4694b0a6) **diff**: [2015 to 2016 ](https://github.com/openedx/edx-platform/compare/877e231c...4694b0a6)


#### Quick Stats

```python
-----Stat for the 2015 Total Changes is  6518-----
Deletion: count: 2505 percentage: %38.43
Added:    count: 2171 percentage: %33.31
Modified: count: 1745 percentage: %26.77
Renamed:  count: 97   percentage: %1.49
```

```python
 6518 files changed, 582239 insertions(+), 2297071 deletions(-)
   3.9% cms/static/
   5.1% cms/
   6.0% common/djangoapps/
   4.8% common/lib/xmodule/xmodule/
   5.2% common/static/css/vendor/pdfjs/cmaps/
   3.3% common/static/js/vendor/mathjax-MathJax-c9db6ac/docs/
   4.3% common/static/js/vendor/mathjax-MathJax-c9db6ac/jax/output/HTML-CSS/fonts/
   4.3% common/static/js/vendor/mathjax-MathJax-c9db6ac/unpacked/jax/output/HTML-CSS/fonts/
   3.4% common/static/js/vendor/mathjax-MathJax-c9db6ac/unpacked/
   5.1% common/static/js/vendor/mathjax-MathJax-c9db6ac/
   4.8% common/static/
   4.0% common/test/
   4.9% conf/locale/
  12.2% lms/djangoapps/
   4.5% lms/static/js/
   5.1% lms/static/
   5.4% lms/templates/
   3.0% openedx/core/djangoapps/
   3.0% static/
   ```
<details><summary>Source</summary>

```bash 
diff 877e231c7ad14e2b3ff4accfca5711d81b2bd817 4694b0a6f9036ee73da317829c2c1e7be3729944 --shortstat --dirstat=files
```
</details>

#### Summary

Seems most of work was aimed at refactoring, hence 2015 is the year with the most % in deletion _beside 2011_.
 

### 2016

Comparing **from** [#4694b0a6](https://github.com/openedx/edx-platform/tree/4694b0a6) **to** [#bd87b218](https://github.com/openedx/edx-platform/tree/) **diff**: [2016 to 2017 ](https://github.com/openedx/edx-platform/compare/4694b0a6...bd87b218)


#### Quick Stats

```python
-----Stat for the 2016 Total Changes is  5034-----
Modifed: count: 2893 percentage: %57.47
Added:   count: 1325 percentage: %26.32
Deleted: count: 608  percentage: %12.08
Renamed: count: 208  percentage: %4.13
```

```python
 5034 files changed, 388347 insertions(+), 198672 deletions(-)
   6.5% cms/static/js/
   3.5% cms/templates/
   5.4% cms/
   5.1% common/djangoapps/
   5.5% common/lib/xmodule/xmodule/
   3.7% common/static/js/
   8.0% common/static/
   3.1% common/test/acceptance/
   3.0% common/
  14.0% lms/djangoapps/
   9.0% lms/static/js/
   5.8% lms/static/
   6.2% lms/templates/
   8.3% openedx/core/djangoapps/
   3.1% static/vendor/
   ```
<details><summary>Source</summary>

```bash 
git diff 4694b0a6f9036ee73da317829c2c1e7be3729944 bd87b218ce6c82102b63801e608bd8e69c15bff9 --shortstat --dirstat=files
```
</details>

#### Summary

Seems a lot of moving occurred at this period, mainly from `/common` to `/openedx/core`.

### 2017

Comparing **from** [#bd87b218](https://github.com/openedx/edx-platform/tree/bd87b218) **to** [#26cc70a7](https://github.com/openedx/edx-platform/tree/) **diff**: [2017 to 2018 ](https://github.com/openedx/edx-platform/compare/bd87b218...26cc70a7)


#### Quick Stats

```python
-----Stat for the 2017 Total Changes is  4217-----
Modified: count: 2723 percentage: %64.57
Added:    count: 1099 percentage: %26.06
Deleted:  count: 275  percentage: %6.52
Renamed:  count: 120  percentage: %2.85
```

```python
 4217 files changed, 324499 insertions(+), 152291 deletions(-)
   3.5% cms/djangoapps/contentstore/
   4.7% cms/static/js/
   6.5% cms/
   7.7% common/djangoapps/
   5.6% common/lib/xmodule/xmodule/
   3.3% common/static/
   3.6% common/test/acceptance/
  18.9% lms/djangoapps/
   5.9% lms/static/js/
   4.2% lms/static/sass/
   4.4% lms/templates/
  13.3% openedx/core/djangoapps/
   3.7% openedx/features/ 
  ```
<details><summary>Source</summary>

```bash 
git diff bd87b218ce6c82102b63801e608bd8e69c15bff9 26cc70a7bcbdb5842e02bf464227d838acb3bd89 --shortstat --dirstat=files
```
</details>


### 2018

Comparing **from** [#26cc70a7](https://github.com/openedx/edx-platform/tree/bd87b218) **to** [#aeca12ba](https://github.com/openedx/edx-platform/tree/aeca12ba) **diff**: [2017 to 2018 ](https://github.com/openedx/edx-platform/compare/26cc70a7...aeca12ba)


#### Quick Stats

```python
-----Stat for the 2018 Total Changes is  3482-----
Modified: count: 2345 percentage: %67.35
Added:    count: 719  percentage: %20.65
Deleted:  count: 329  percentage: %9.45
Renamed:  count: 89   percentage: %2.56
```

```python
 3482 files changed, 234640 insertions(+), 186053 deletions(-)
   3.4% cms/djangoapps/contentstore/
   4.2% cms/static/js/
   3.9% cms/
   6.6% common/djangoapps/
   6.8% common/lib/xmodule/xmodule/
   4.2% common/static/
   3.1% common/test/acceptance/
   3.5% common/
  19.0% lms/djangoapps/
   5.7% lms/static/js/
   7.1% lms/templates/
   4.1% lms/
  15.2% openedx/core/djangoapps/
   3.7% openedx/features/
   ```
<details><summary>Source</summary>

```bash 
git diff 26cc70a7bcbdb5842e02bf464227d838acb3bd89 aeca12ba7b5d10db80a42c182801842f80837952 --shortstat --dirstat=files
```
</details>

### 2019

Comparing **from** [#aeca12ba](https://github.com/openedx/edx-platform/tree/aeca12ba) **to** [#](https://github.com/openedx/edx-platform/tree/43a06fe3) **diff**: [2018 to 2019 ](https://github.com/openedx/edx-platform/compare/aeca12ba...43a06fe3)


#### Quick Stats

```python
-----Stat for the 2019 Total Changes is  4125-----
Modified: count: 3131 percentage: %75.90
Added:    count: 551  percentage: %13.36
Deleted:  count: 275  percentage: %6.67
Renamed:  count: 167  percentage: %4.05
```

```python
 4125 files changed, 856496 insertions(+), 103317 deletions(-)
   4.1% cms/djangoapps/contentstore/
   4.8% cms/
  10.2% common/djangoapps/
   4.9% common/lib/xmodule/xmodule/
   4.3% common/test/acceptance/
   5.0% common/
   3.0% conf/locale/
  24.3% lms/djangoapps/
   4.1% lms/templates/
   3.6% lms/
  19.6% openedx/core/djangoapps/
   4.0% openedx/features/
   ```
<details><summary>Source</summary>

```bash 
git diff aeca12ba7b5d10db80a42c182801842f80837952 43a06fe38589d748af8de5ee579bf5a177e01cd7 --shortstat --dirstat=files
```
</details>

### 2020 

Comparing **from** [#aeca12ba](https://github.com/openedx/edx-platform/tree/aeca12ba) **to** [#3ff5fc7d](https://github.com/openedx/edx-platform/tree/3ff5fc7d) **diff**: [ 2019 to 2020 ](https://github.com/openedx/edx-platform/compare/aeca12ba...3ff5fc7d)


#### Quick Stats

```python
-----Stat for the 2020 Total Changes is  5298-----
Modified: count: 2523 percentage: %47.62
Added:    count: 2432 percentage: %45.90
Deleted:  count: 301  percentage: %5.68
Renamed:  count: 42   percentage: %0.79
```

```python
 5298 files changed, 306156 insertions(+), 310792 deletions(-)
   3.7% cms/static/
   4.6% cms/
   5.7% common/djangoapps/
   3.1% common/test/
   3.0% common/
  24.7% import_shims/lms/
   3.1% import_shims/studio/contentstore/
   7.7% import_shims/studio/
  13.9% lms/djangoapps/
   6.3% lms/static/
   3.1% lms/templates/
  11.0% openedx/core/djangoapps/
   3.9% openedx/
  ```
<details><summary>Source</summary>

```bash 
git diff 43a06fe38589d748af8de5ee579bf5a177e01cd7 3ff5fc7d5f3bef364890728d47cda7b06d1efedb --shortstat --dirstat=files
```
</details>


### 2021

Comparing **from** [#3ff5fc7d](https://github.com/openedx/edx-platform/tree/3ff5fc7d) **to** [#43d219bf](https://github.com/openedx/edx-platform/tree/43d219bf) **diff**: [2021 to 2022](https://github.com/openedx/edx-platform/compare/3ff5fc7d...43d219bf)


#### Quick Stats

```python
-----Stat for the 2022 Total Changes is  1447-----
Modified: count: 1028 percentage: %71.04
Deleted:  count: 221  percentage: %15.27
Added:    count: 176  percentage: %12.16
Renamed:  count: 22   percentage: %1.52```

```python
 5965 files changed, 316542 insertions(+), 237752 deletions(-)
   3.6% cms/djangoapps/
   3.7% cms/
   6.6% common/djangoapps/
   3.2% common/lib/xmodule/xmodule/
  21.9% import_shims/lms/
   9.6% import_shims/studio/
  17.1% lms/djangoapps/
   3.1% lms/static/
  15.6% openedx/core/djangoapps/
   4.3% openedx/ 
  ```
<details><summary>Source</summary>

```bash 
git diff 3ff5fc7d5f3bef364890728d47cda7b06d1efedb 43d219bf72ceaeb691cce827403b7c2b09b84a14 --shortstat --dirstat=files
```
</details>


### 2022-05 

Comparing **from** [#43d219bf](https://github.com/openedx/edx-platform/tree/43d219bf) **to** [#98d990d7](https://github.com/openedx/edx-platform/tree/98d990d7) **diff**: [2022-01 to 2022-05](https://github.com/openedx/edx-platform/compare/43d219bf...98d990d7)


#### Quick Stats

```python
-----Stat for the 2021 Total Changes is  5965-----
Modified: count: 3440 percentage: %57.67
Deleted: count: 2026 percentage: %33.96
Added: count: 455 percentage: %7.63
Renamed: count: 44 percentage: %0.74
```

```python
 1447 files changed, 112124 insertions(+), 87628 deletions(-)
   3.2% cms/djangoapps/contentstore/
   4.2% cms/
   4.8% common/djangoapps/
   4.3% common/lib/xmodule/xmodule/
   4.6% common/test/acceptance/
   4.4% common/test/
   7.9% conf/locale/
   3.5% lms/djangoapps/courseware/
  19.6% lms/djangoapps/
   5.2% lms/
  18.7% openedx/core/djangoapps/
   3.2% openedx/features/course_experience/
   5.0% openedx/
  ```
<details><summary>Source</summary>

```bash 
git diff 43d219bf72ceaeb691cce827403b7c2b09b84a14 98d990d7af754d44d70a215bc20ded08eb5135b5 --shortstat --dirstat=files
```
</details>

### Appendix

Here you can find extra code resource I used to get above numbers.

### The change percent 
```bash
alias diff11="git diff cc1de22e2621c7fa1199750cf13ba57c937b9d98 548d0491c3cfc8de55794243a36e86fc66aecce9"
alias diff12="git diff 548d0491c3cfc8de55794243a36e86fc66aecce9 fa75245e8a6f2358d24398c79eeb7327ee6668a0"
alias diff13="git diff fa75245e8a6f2358d24398c79eeb7327ee6668a0 39380f2d2226f0d89fa9d2a5f2fc53aa4047522f"
alias diff14="git diff 39380f2d2226f0d89fa9d2a5f2fc53aa4047522f 877e231c7ad14e2b3ff4accfca5711d81b2bd817"
alias diff15="git diff 877e231c7ad14e2b3ff4accfca5711d81b2bd817 4694b0a6f9036ee73da317829c2c1e7be3729944"
alias diff16="git diff 4694b0a6f9036ee73da317829c2c1e7be3729944 bd87b218ce6c82102b63801e608bd8e69c15bff9"
alias diff17="git diff bd87b218ce6c82102b63801e608bd8e69c15bff9 26cc70a7bcbdb5842e02bf464227d838acb3bd89"
alias diff18="git diff 26cc70a7bcbdb5842e02bf464227d838acb3bd89 aeca12ba7b5d10db80a42c182801842f80837952"
alias diff19="git diff aeca12ba7b5d10db80a42c182801842f80837952 43a06fe38589d748af8de5ee579bf5a177e01cd7"
alias diff20="git diff 43a06fe38589d748af8de5ee579bf5a177e01cd7 3ff5fc7d5f3bef364890728d47cda7b06d1efedb"
alias diff21="git diff 3ff5fc7d5f3bef364890728d47cda7b06d1efedb 43d219bf72ceaeb691cce827403b7c2b09b84a14"
alias diff22="git diff 43d219bf72ceaeb691cce827403b7c2b09b84a14 98d990d7af754d44d70a215bc20ded08eb5135b5"

years=(11 12 13 14 15 16 17 18 19 20 21 22)
for year in "${years[@]}"
do
total_changes=$(eval diff$year --name-status  | wc -l)
echo "-----Stat for the 20"$year" Total Changes is "$total_changes"-----"
eval diff$year  --name-status | cut -c1 | sort | uniq -c  | sort -r | \
awk '{print "Mode: "$2", count: "$1   " percentage: %" $1/total_changes * 100 }' total_changes="${total_changes}"  CONVFMT="%4.2f"

done
```
### Commit log messages all in one big file.

```bash 
#!/bin/bash
years=(11 12 13 14 15 16 17 18 19 20 21 22)
for year in "${years[@]}"
do
echo "PLACEHOLDER_YEAR_START_"$year"" >> commits_messages_long.txt
git log --no-merges --reverse --after 20"$year".1.1 --before 20"$(($year + 1))".1.1  >> commits_messages_long.txt
echo "PLACEHOLDER_YEAR_END_"$year"" >> commits_messages_long.txt
done
```
### Commit log messages a file for each year accumulative.

```bash
#!/bin/bash
#Accumulative
years=(11 12 13 14 15 16 17 18 19 20 21 22)
for year in "${years[@]}"
do
git log --no-merges --before 20"$year".12.30  > commits_acc_long_"$year".txt
done
```


