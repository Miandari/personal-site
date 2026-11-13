// The prompts are the piloted versions from the workshop's prompt pack.
export const PART_TWO = {
  slug: "part-2",
  title: "Talking to agents",
  intro:
    "Part two of the workshop. The data and every prompt we use, in the order we use them, so you can copy each one as we go.",
  dataUrl: "/documents/tuning-workshop.zip",
  dataSource: {
    label: "Neural Data Science course data",
    href: "https://zenodo.org/records/4704658",
  },
  links: {
    grillMe: "https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me",
    claudeMd: "https://github.com/multica-ai/andrej-karpathy-skills/blob/main/CLAUDE.md",
    caveman: "https://github.com/JuliusBrussee/caveman",
    adhd: "https://github.com/ayghri/i-have-adhd",
  },
} as const;

const FIRST_PROMPT =
  "In the data/ folder there are two files from a neuroscience experiment, nda_ex_5_spiketimes.csv and nda_ex_5_stimulus.csv. Analyze the direction tuning of the neurons and tell me what you find. Keep everything you create inside this project folder, and leave data/ as it is.";

export const PROMPTS = {
  first: FIRST_PROMPT,

  askDecisions:
    "Thanks. I'm new to this kind of data, so before I use any of it: what did you decide on your own that I didn't tell you? Keep it short and in plain words, and tell me which of those decisions would change how many neurons count as direction-selective.",

  askRule:
    "That helps. I asked my supervisor about number 1. In our lab a cell only counts as direction-selective if it fires at least three times as much for its preferred direction as for the opposite one, using the plain average firing rates, on top of the test you already ran. How many is it with that rule, and which cells?",

  grillMe: `Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions one at a time, waiting for feedback on each question before continuing. Asking multiple questions at once is bewildering.

If a fact can be found by exploring the codebase, look it up rather than asking me. The decisions, though, are mine — put each one to me and wait for my answer.

Do not enact the plan until I confirm we have reached a shared understanding.

${FIRST_PROMPT}`,

  grillMeInstall: "npx skills@latest add mattpocock/skills",

  grillMeCommand:
    "/grill-me Analyze the direction tuning of the neurons in data/ and tell me what you find.",

  cavemanInstall: "npx skills add JuliusBrussee/caveman -g",

  adhdInstall: `claude plugin marketplace add ayghri/i-have-adhd
claude plugin install i-have-adhd@i-have-adhd`,

  reportShape:
    "Start with the result in one line. Number the steps. End with the one thing I should do next.",

  last: `Looking back at this session: what did you learn about how I like to work, and what did I have to correct or repeat? Sort it into three lists:
1. Lines for this project's instruction file.
2. Things worth remembering about me in any project.
3. Things I could have said at the start that would have saved us time.`,

  loop: `I want to build a Stroop experiment that runs in a browser from one file, stroop.html, with no internet connection and no libraries. I'm a psychology grad student. I know the task well but I don't write JavaScript.

The task. A colour word (RED, GREEN, BLUE, YELLOW) appears in one of those four ink colours. The participant presses D, F, J or K for the ink colour (D = red, F = green, J = blue, K = yellow). There are 12 practice trials with feedback, then 96 test trials without feedback, with a break after test trial 48. The participant number comes from the address, as in stroop.html?participant=7.

It is done when all of this is true:
1. The same participant number always gives the same trial order, and different numbers give different orders.
2. The 96 test trials are half congruent and half incongruent, each ink colour appears 24 times, and each of the 12 incongruent word-ink pairs appears 4 times. Each half of the test (trials 1-48 and 49-96) has that same balance on its own.
3. In the test trials the ink colour never repeats from one trial to the next, the word never repeats from one trial to the next, and there are never more than 3 congruent or more than 3 incongruent trials in a row.
4. Each trial shows a fixation cross for 500 ms, then the word until a valid key is pressed or 2000 ms have passed, then a blank screen for 300 ms. Other keys do nothing.
5. Every trial, practice included, gives one row of data with these columns in this order: participant, block (practice or test), trial, word, ink, congruent (1 or 0), key, correct (1 or 0), rt_ms, timed_out (1 or 0). At the end the data is offered as a CSV file and is also left on the page as text in an element with the id "data".
6. Adding &robot=1 to the address makes a simulated participant do the whole experiment by itself, quickly, so that I can watch it and so that it can be tested. The simulated participant should answer correctly on about 90% of trials, be about 80 ms slower on incongruent trials, and let about 3% of trials time out.
7. Requirements 1 to 5 hold for every participant number from 1 to 200 when the simulated participant does the experiment.

How to work. First write the checks for the list above as one command I can run myself, using only what is already installed on this machine. The checks must run from the command line: run the experiment's own code with Node and a stand-in for the page, the clock and the keyboard. If Node is not installed, check what you can with Python and tell me exactly what was left unchecked. I am working on this laptop while you do this, so if you also try the experiment in a real browser, open only one at a time and close it before you open the next. Then build, run the checks, fix what fails, and run them again. Keep going round that loop without stopping to ask me, until every check passes or you have gone round 15 times. Never weaken or remove a check to make it pass. When you stop, tell me in a few lines: how many rounds it took, what passes, what does not, what could not be checked, the command that runs the checks, and how to try the experiment myself. Keep everything inside this project folder.`,

  secondOpinion: `The analysis in this folder was done by an AI agent in another session. Its summary told me that 19 of the 41 neurons are orientation-tuned and that 2 (neurons 3 and 34) are direction-selective, "meaning they respond much more to one direction of motion than to the opposite one". I'm a psychology grad student and I want to use these numbers in a lab report, so before I do, please check the work the way a sceptical reviewer would. You didn't write it, so don't assume it is right.

Rerun what you need, compare the results files with the raw data, and look for mistakes: places where the code does not do what it says, or where the reported numbers do not follow from the data. Don't fix or change any of the existing files; if you need to write test scripts, put them in a new folder called review/.

Report back a short list, most serious first. For each item: what is wrong, how you know (what you ran or compared), and whether it changes the headline numbers. Then, separately, list choices that are debatable but not mistakes. Take about ten minutes, and tell me if that wasn't enough.`,

  withIntro: `In the data/ folder there are two files from a neuroscience experiment, nda_ex_5_spiketimes.csv and nda_ex_5_stimulus.csv.

Some background before the task. I'm a psychology grad student and new to neural data. I know statistics (regression, permutation tests, correcting for multiple comparisons) but not neuroscience conventions. This is for a short methods-and-results section in a lab report, so I need a few results I can defend, not a broad exploration. The question I care about is which neurons are direction-selective, which are orientation-selective, and which are neither.

How I'd like you to work: wherever the analysis needs a choice that would change the answer (the time window, the statistical test, the cut-off for calling a neuron selective), use the most standard convention and list each choice at the top of your answer with one line on why. Stay on this question. If you notice other things worth analysing, don't do them; list them at the end under "Noticed, not done". Keep the write-up short: the list of choices, one table, one figure, and under 300 words of text.

Analyze the direction tuning of the neurons and tell me what you find. Keep everything you create inside this folder.`,

  learnAnalysis: `Thanks for the analysis. Before I use any of it I need to understand it, and I'm new to this. I'm a psychology grad student. I know statistics (regression, permutation tests, p-values), but I have never worked with recordings from neurons, and I don't know what direction tuning is or why you did the steps you did.

Please make me a short learning page as one self-contained HTML file I can open in a browser. Teach me this analysis from the beginning using my own data: what was recorded and what one row of each file means, what a tuning curve is, what it means for a neuron to be orientation-selective or direction-selective, and how you decided which neurons are which. Use two or three neurons from my results as running examples, including one clear case and one borderline case. Explain every technical word in plain words the first time you use it.

Keep it small: about a five-minute read, at most four figures drawn from my data, no interactive controls. End with the three decisions you made that I should be able to defend, and three questions I can use to check that I understood, with answers. Don't change the analysis or its results. Aim to finish in about five minutes of work, and tell me if that wasn't enough to do it properly.`,

  search: `I want to improve one part of this analysis: deciding which neurons are direction-selective. Right now the answer depends on where I draw the line (significance alone, or an index above 0.5), and with only 11 trials per direction some low-firing neurons are borderline. I'd like a method where that decision is easier to defend.

Search the literature for how people handle this. About me: I'm a psychology grad student. I know regression, mixed models, permutation tests and some Bayesian statistics, but not neuroscience-specific methods, so I need something I can understand and justify in a methods section.

Bring back three candidate methods. For each one: what it does in a couple of sentences, which weakness of my current approach it fixes, what it costs (assumptions, data needs, complexity), and one or two papers I can cite, with links. Then tell me which one you would pick for this dataset and why.

Don't implement anything yet, and take about ten minutes. If you had to assume something about what I want, say what you assumed.`,

  learnMethod: `I've decided to replace my rule for calling a neuron direction-selective with this method: fit each neuron's spike counts with a Bayesian negative-binomial version of my two-peak tuning curve, then call the neuron direction-selective if the posterior probability that its direction index is above 0.5 is at least 0.95, not direction-selective if that probability is at most 0.05, and undetermined otherwise.

Before you implement anything, I need to understand this well enough to explain it in a methods section. Please make me a short learning page for it, as one self-contained HTML file I can open in a browser.

About me: I'm a psychology grad student. I'm comfortable with regression, mixed models, permutation tests and p-values, and I know what a prior and a posterior are but not how sampling works. I don't know neuroscience conventions.

Keep it small, because I only have a few minutes: about a five-minute read, at most three figures, no interactive controls. Start from my current rule and where it breaks, using two neurons from my own results as examples, then build the new idea one step at a time, and say plainly which choices I will have to defend. Don't fit the model or run simulations; simple illustrative sketches are fine as long as they are labelled as illustrative. Aim to finish in about five minutes of work, and tell me if that wasn't enough to do it properly.`,

  buildMethod: `I've decided to replace my rule for calling a neuron direction-selective with this method: fit each neuron's spike counts with a Bayesian negative-binomial version of a two-peak tuning curve (one peak at the preferred direction, a second at the opposite direction), then call the neuron direction-selective if the posterior probability that its direction index is above 0.5 is at least 0.95, not direction-selective if that probability is at most 0.05, and undetermined otherwise.

Please implement it on my data now. About me: I'm a psychology grad student. I know regression, permutation tests and a little Bayesian statistics, but not neuroscience conventions.

What I need back: one table with a row per neuron (the probability and the call), one figure I can put in a lab report, and a few lines telling me how many neurons got each call and which ones. Then list every choice you made that I did not specify, with one line on why, and say which of them could change a call.

How far to go: keep the existing analysis and its files as they are, and put everything new in a folder called bayes/. Use what is already installed. Aim for about ten minutes of work, and tell me if that was not enough to do it properly.`,
} as const;

export const COMMANDS = [
  {
    keys: "/effort · ultrathink",
    description:
      "How hard it thinks. /effort sets it for the session; the word ultrathink in a message raises that one turn.",
  },
  {
    keys: "Shift+Tab",
    description: "Plan mode. It reads and proposes, and changes nothing until you agree.",
  },
  {
    keys: "/init · /memory",
    description:
      "/init drafts a CLAUDE.md from your folder. /memory opens what it keeps. Or say “add this to CLAUDE.md”.",
  },
  {
    keys: "/remote-control",
    description:
      "Carry on the same session from your phone. The work stays on your laptop. Paid plans.",
  },
  {
    keys: "/handoff",
    description:
      "A note that lets a fresh session pick up where this one stopped. A skill, from the same collection as grill-me.",
  },
  {
    keys: "/rewind",
    description:
      "Undo. Roll the files, the conversation or both back to an earlier point. Also Esc twice.",
  },
  {
    keys: "/context · /compact · /clear",
    description: "See what fills its working memory, shorten it, or start clean.",
  },
  {
    keys: "/goal · /loop",
    description:
      "Keep working until a condition is met, or repeat a prompt on a timer. See the loop above.",
  },
] as const;
